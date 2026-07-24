// configuration of dotenv
require("dotenv").config({ path: __dirname + "/config/.env" });

const cluster = require("node:cluster");
const { availableParallelism } = require("node:os");

const numCPUs = availableParallelism();

if (process.env.NODE_ENV === "development") {
    console.log("You can't run on cluster in development env!");
    return process.exit(0);
};

console.log("Primary cluster pid", process.pid);

cluster.setupPrimary({
    exec: __dirname + "/index.js"
});

// Fork workers.
for (let i = 0; i < numCPUs; i++) {
    createWorker();
};

function createWorker() {
    const worker = cluster.fork();
    console.log(`Worker process ${worker.process.pid} started`);

    worker.on("exit", (code) => {
        console.log(`worker ${worker.process.pid} exited with code ${code}`)
        createWorker();
    });
};
