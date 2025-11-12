import { WorkerAPI, WorkerMessage, WorkerResponse } from "./types";

const DEBUG = false;
const log = (...args: any[]) => {
  if (DEBUG) {
    console.log("[worker]", ...args);
  }
};

/**
 * Creates a worker instance that implements the worker protocol.
 * Use this in your web worker file to handle messages from the main thread.
 * 
 * All API methods must return Promises.
 */
export function createWorkerInstance<TAPI extends WorkerAPI<TAPI>>(api: TAPI) {
  log("Creating worker instance", api);

  async function handleMessage(message: WorkerMessage<TAPI>) {
    const { id, method, args = [] } = message;

    if (!method || !(method in api)) {
      const error = new Error(`Method ${String(method)} not found`);
      self.postMessage({
        id,
        type: "error",
        error: { message: error.message, stack: error.stack },
      });
      return;
    }

    try {
      const fn = api[method] as Function;
      const result = fn(...args);

      if (!(result instanceof Promise)) {
        throw new Error(
          `Method ${String(method)} must return a Promise`
        );
      }

      try {
        const value = await result;
        self.postMessage({ id, type: "resolve", value });
      } catch (error) {
        if (error instanceof Error) {
          self.postMessage({
            id,
            type: "error",
            error: { message: error.message, stack: error.stack },
          });
        }
      }
    } catch (error) {
      if (error instanceof Error) {
        self.postMessage({
          id,
          type: "error",
          error: { message: error.message, stack: error.stack },
        });
      }
    }
  }

  self.addEventListener("message", (event) => {
    const message = event.data as WorkerMessage<TAPI>;
    handleMessage(message).catch((error) => {
      if (error instanceof Error) {
        self.postMessage({
          id: message.id,
          type: "error",
          error: { message: error.message, stack: error.stack },
        });
      }
    });
  });
}
