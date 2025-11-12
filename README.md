# web-worker-rpc

Typed, promise-based RPC APIs for web workers.

This monorepo contains:

- **`@janwirth/worker-rpc`** - The main library package
- **`example`** - Example usage with Vite

## Installation

```bash
bun install
```

## Building

Build the worker-rpc package:

```bash
bun run build
```

## Development

Run the example:

```bash
cd example
bun run dev
```

## Package Structure

- `worker-rpc/` - Main library package (`@janwirth/worker-rpc`)
- `example/` - Example application demonstrating usage

## Workspaces

This project uses Bun workspaces. The root `package.json` defines workspaces for `worker-rpc` and `example` packages.
