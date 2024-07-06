import "dotenv/config";
import express from "express";
import cors from "cors";
import httpServer from "http";
import cookieParser from "cookie-parser";
import logger from "./utils/logger";
import allRoutes from "./routes";

async function bootstrap() {
  // Init express
  const app = express();

  const sHttpServer = httpServer.createServer(app);

  // protecting our api from unauthorized origins
  app.use(
    cors({
      origin: process.env.CLIENT_SIDE_URL || "http://localhost:3000",
      credentials: true,
      exposedHeaders: ["Access-Control-Allow-Credentials"],
    })
  );
  app.use(express.json());
  app.use(cookieParser());

  allRoutes(app);
  sHttpServer.listen(process.env.PORT, async () => {
    logger.info(`Server started on http://localhost:${process.env.PORT}`);

    logger.info("Let's start!");
  });
}
bootstrap();
