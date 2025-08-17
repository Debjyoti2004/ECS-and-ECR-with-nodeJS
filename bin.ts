import cluster from "cluster";
import os from "os";
import { app } from "./index";

const numCPUs = os.cpus().length;
const PORT = process.env.PORT || 3000;

if (cluster.isPrimary) {
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }
} else {
    app.listen(PORT, () => {
    console.log(`🚀 Server listening on http://localhost:${PORT}`);
    console.log(`Running with Process ID: ${process.pid}`);
  });
}