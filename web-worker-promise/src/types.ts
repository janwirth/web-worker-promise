// Type for any promise function
export type PromiseFunction<TArgs extends any[], TReturn> = (
  ...args: TArgs
) => Promise<TReturn>;

// Type for a record of promise functions
export type WorkerAPI<TAPI> = {
  [K in keyof TAPI]: TAPI[K] extends PromiseFunction<infer Args, infer Return>
    ? PromiseFunction<Args, Return>
    : never;
};

// Type for worker messages
export type WorkerMessage<TAPI> = {
  id: string;
  method?: keyof TAPI;
  args?: any[];
};

// Type for worker responses
export type WorkerResponse<TValue = unknown> = {
  id: string;
  type: "resolve" | "error";
  value?: TValue;
  error?: { stack: string; message: string };
};

// Type for the client API
export type ClientAPI<TAPI> = {
  [K in keyof TAPI]: TAPI[K] extends PromiseFunction<infer Args, infer Return>
    ? PromiseFunction<Args, Return>
    : never;
};
