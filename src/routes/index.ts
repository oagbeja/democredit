import userRoutes from "./user.route";
import { Express } from "express";

const allRoutes = (app: Express) => {
  app.use("/api/auth", userRoutes);
};

export default allRoutes;
