# web-worker-rpc

Typed, promise-based RPC APIs for web workers.

This monorepo contains:

- **`@janwirth/web-worker-promise`** - The main library package
- **`example`** - Example usage with Vite

## Installation

```bash
bun install
```

## Building

Build the web-worker-promise package:

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

- `web-worker-promise/` - Main library package (`@janwirth/web-worker-promise`)
- `example/` - Example application demonstrating usage

## Workspaces

This project uses Bun workspaces. The root `package.json` defines workspaces for `web-worker-promise` and `example` packages.
