# @janwirth/web-worker-promise

Typed, promise-based APIs for web workers.

For a working example, check out `/example` in the monorepo root.

## Usage

The package provides separate entry points for main thread and worker code:

- `@janwirth/web-worker-promise/main` - For main thread code (client)
- `@janwirth/web-worker-promise/worker` - For worker code (instance)

In your worker file, define your API (all methods must return Promises):

```typescript
import { createWorkerInstance } from "@janwirth/web-worker-promise/worker";

const myApi = {
  async processData(data: string): Promise<string> {
    // Process data
    return processedData;
  },

  async calculateSum(a: number, b: number): Promise<number> {
    return a + b;
  },
};

createWorkerInstance(myApi);
```

In your main thread code, create a client:

```typescript
import { createClient } from "@janwirth/web-worker-promise/main";

const worker = new Worker(new URL("./worker.ts", import.meta.url), {
  type: "module",
});

const client = createClient<typeof myApi>(worker);

// Use the client - fully type-safe!
const result = await client.processData("input");
const sum = await client.calculateSum(5, 3);
```

**Note:** The default export (`@janwirth/web-worker-promise`) also works and points to `/main` for backward compatibility.

## API

### `createWorkerInstance<TAPI>(api: TAPI)`

Creates a worker instance that handles messages from the main thread.
Must be a record of Promise-returning functions.

### `createClient<TAPI>(worker: Worker): ClientAPI<TAPI>`

Creates a type-safe client proxy for communicating with a worker.

### Types

- `WorkerAPI<TAPI>` - Type constraint for worker API definitions (Promise functions only)
- `ClientAPI<TAPI>` - Type for the client proxy
- `WorkerMessage<TAPI>` - Internal message type
- `WorkerResponse<TValue>` - Internal response type
