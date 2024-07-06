import { Request, Response } from "express";
import logger from "../utils/logger";

export default class UserService {
  async signupUser(req: Request, res: Response) {
    try {
      //fetch for duplicates
      //Add to db and send jwt token
      res.json({ user: true });
    } catch (e) {
      logger.error(e);
    }
  }
}
