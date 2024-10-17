import config from "./src/utils/config";
import app from "./app";
import { connectToDatabase } from "./src/utils/db";

const start = async () => {
    try {
        await connectToDatabase();
        app.listen(config.PORT, () => {
            console.log(`Server is running on port ${config.PORT}`);
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.log("Failed to start the server:", error.message);
        }
        process.exit(1);
    }
};

start();
