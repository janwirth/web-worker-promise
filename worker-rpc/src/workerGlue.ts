import { WorkerAPI, ClientAPI, WorkerResponse } from "./types";

const DEBUG = false;
const log = (...args: any[]) => {
  if (DEBUG) {
    console.log("[client]", ...args);
  }
};

/**
 * Creates a type-safe client for communicating with a worker.
 * All API methods must return Promises.
 */
export function createClient<TAPI extends WorkerAPI<TAPI>>(
  worker: Worker
): ClientAPI<TAPI> {
  let nextId = 0;
  const pendingCalls = new Map<
    string,
    {
      resolve: (value: any) => void;
      reject: (error: any) => void;
    }
  >();

  worker.addEventListener("message", (event) => {
    const message = event.data as WorkerResponse;
    const call = pendingCalls.get(message.id);
    if (!call) return;

    if (message.type === "resolve") {
      log(`Received resolve for id: ${message.id}`, message.value);
      call.resolve(message.value);
      pendingCalls.delete(message.id);
    } else if (message.type === "error") {
      log(`Received error for id: ${message.id}:`, message.error);
      call.reject(
        new Error(message.error?.message, {
          cause: message.error?.stack,
        })
      );
      pendingCalls.delete(message.id);
    }
  });

  return new Proxy({} as ClientAPI<TAPI>, {
    get: (_, method: string) => {
      return function (...args: any[]): Promise<any> {
        const id = String(nextId++);
        return new Promise<any>((resolve, reject) => {
          pendingCalls.set(id, { resolve, reject });
          worker.postMessage({ id, method, args });
        });
      };
    },
  });
}
