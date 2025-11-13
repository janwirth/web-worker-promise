import { createWorkerInstance } from "@janwirth/web-worker-promise/worker";
// Define the worker API - all methods must return Promises
const workerApi = {
    /**
     * Returns a greeting after a delay
     */
    async sayHello(name, delayMs = 1000) {
        await new Promise((resolve) => setTimeout(resolve, delayMs));
        return `Hello, ${name}! This message came from the worker after ${delayMs}ms delay.`;
    },
    /**
     * Simulates processing data with progress updates
     */
    async processData(data, steps = 5) {
        const results = [];
        for (let i = 1; i <= steps; i++) {
            await new Promise((resolve) => setTimeout(resolve, 500));
            results.push(`Step ${i}/${steps}: Processed ${data}`);
        }
        return results;
    },
};
// Create the worker instance
createWorkerInstance(workerApi);
