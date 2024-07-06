import { Request, Response } from "express";
import logger from "../utils/logger";
import UserService from "../services/user.service";
import presentMessage from "../utils/response";

const userService = new UserService();

export default class UserController {
  async signupUser(req: Request, res: Response) {
    try {
      let payload = await userService.signupUser(req.body);
      presentMessage(res, 200, payload, "User successfully signed up");
    } catch (e) {
      presentMessage(res, 400, undefined, e.message);
    }
  }

  async login(req: Request, res: Response) {
    try {
      let payload = await userService.login(req.body);
      presentMessage(res, 200, payload, "User successfully logged in");
    } catch (e) {
      presentMessage(res, 401, undefined, e.message);
    }
  }
}
