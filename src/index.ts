import "dotenv/config";
import express from "express";
import cors from "cors";
import httpServer from "http";
import cookieParser from "cookie-parser";

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

  sHttpServer.listen(process.env.PORT, async () => {
    console.log(`Server started on http://localhost:${process.env.PORT}`);
    //run migrations..
    // if ((process.env.MIGRATE as string) === "1") await migrate();
    // //later...JWT
    // //routes..
    // routes(app);

    // swaggerDocs(app);
    console.log("Let's start!");
  });
}
bootstrap();
