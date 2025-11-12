# Worker RPC Example

A simple example application demonstrating the `@janwirth/worker-rpc` package with Vite.

## Features

- **Promise-based method**: `sayHello()` - Demonstrates async/await with a timeout
- **AsyncGenerator method**: `countdown()` - Demonstrates streaming data from worker

## Running

```bash
bun install
bun run dev
```

Then open http://localhost:5173 in your browser.

## What it demonstrates

1. **Type-safe worker communication** - The worker API is fully typed
2. **Promise-based RPC** - Call async functions and await results
3. **Streaming with AsyncGenerators** - Receive multiple values over time
4. **Worker lifecycle** - Proper cleanup with async disposal

## Code Structure

- `src/worker.ts` - The worker implementation with the API
- `src/main.ts` - The main thread code that uses the worker client

