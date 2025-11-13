import { createWorkerInstance } from "@janwirth/web-worker-promise/worker";

// Define the worker API - all methods must return Promises
const workerApi = {
  /**
   * Returns a greeting after a delay
   */
  async sayHello(name: string, delayMs: number = 1000): Promise<string> {
    await new Promise((resolve) => setTimeout(resolve, delayMs));
    return `Hello, ${name}! This message came from the worker after ${delayMs}ms delay.`;
  },

  /**
   * Simulates processing data with progress updates
   */
  async processData(data: string, steps: number = 5): Promise<string[]> {
    const results: string[] = [];
    for (let i = 1; i <= steps; i++) {
      await new Promise((resolve) => setTimeout(resolve, 500));
      results.push(`Step ${i}/${steps}: Processed ${data}`);
    }
    return results;
  },
};

export type WorkerApi = typeof workerApi;

// Create the worker instance
createWorkerInstance(workerApi);
