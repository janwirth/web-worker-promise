import { createClient } from "@janwirth/web-worker-promise/main";
// Create the worker
const worker = new Worker(new URL("./worker.ts", import.meta.url), {
    type: "module",
});
// Create the client
const client = createClient(worker);
// Get DOM elements
const helloBtn = document.getElementById("helloBtn");
const helloOutput = document.getElementById("helloOutput");
const processBtn = document.getElementById("processBtn");
const processOutput = document.getElementById("processOutput");
// Hello example
helloBtn.addEventListener("click", async () => {
    helloBtn.disabled = true;
    helloOutput.textContent = "Calling worker...";
    try {
        const result = await client.sayHello("World", 2000);
        helloOutput.textContent = `Result: ${result}`;
    }
    catch (error) {
        helloOutput.textContent = `Error: ${error instanceof Error ? error.message : String(error)}`;
    }
    finally {
        helloBtn.disabled = false;
    }
});
// Process data example
processBtn.addEventListener("click", async () => {
    processBtn.disabled = true;
    processOutput.textContent = "Processing data...\n";
    try {
        const results = await client.processData("test data", 5);
        processOutput.textContent = "Processing complete!\n\n";
        results.forEach((result, index) => {
            processOutput.textContent += `${result}\n`;
        });
    }
    catch (error) {
        processOutput.textContent += `\nError: ${error instanceof Error ? error.message : String(error)}\n`;
    }
    finally {
        processBtn.disabled = false;
    }
});
