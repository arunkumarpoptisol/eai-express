// src/app.ts
import express, { Application } from "express";
import userRoutes from "./routes/shopifyRoutes";
//@ts-ignore
import { startListener } from "eai-nodejs";
import { rabbitmq } from "./config/config";
import rabbitmqController from "./controllers/rabbitmqController";
import connectDB from "./config/database";

const app: Application = express();
const PORT = process.env.PORT || 4000;

connectDB();
// Middleware
app.use(express.json());

// Routes
app.use("/api/shopify", userRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  startListener(
    rabbitmq.url,
    rabbitmq.outputQueue,
    rabbitmqController.handleIncomingQueue
  );
});
