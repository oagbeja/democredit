import "dotenv/config";

import jwt from "jsonwebtoken";
import logger from "./logger";
import UserService from "../services/user.service";
import { User } from "./interfaces";

export const signToken = (user: User) => {
  try {
    return jwt.sign(user, process.env.TOKEN_SECRET as string);
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export const verifyToken = async (token: string) => {
  try {
    const splitToken = token.split(" ");
    if (
      String(splitToken?.[0]).trim() === "Bearer" &&
      typeof splitToken?.[1] === "string"
    ) {
      let decodedObject: any = jwt.verify(
        splitToken[1],
        process.env.TOKEN_SECRET as string
      );
      const userService = new UserService();
      const userId = await userService.getUserId(decodedObject);
      if (!userId) throw "Invalid user";
      return { ...decodedObject, userId };
    }
    throw "Invalid token";
  } catch (err) {
    logger.error(err);
    throw err;
  }
};
