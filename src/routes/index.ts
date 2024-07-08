import userRoutes from "./user.route";
import fundRoutes from "./fund.route";
import { Express } from "express";

const allRoutes = (app: Express) => {
  app.use("/api/auth", userRoutes);
  app.use("/api/fund", fundRoutes);
};

export default allRoutes;
