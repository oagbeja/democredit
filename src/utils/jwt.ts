import "dotenv/config";

import jwt from "jsonwebtoken";
import logger from "./logger";

interface User {
  email: string;
  firstName: string;
  lastName: string;
  id: string;
}

export const signToken = (user: User) => {
  try {
    return jwt.sign(user, process.env.TOKEN_SECRET as string);
  } catch (err) {
    logger.error(err);
    throw err;
  }
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, process.env.TOKEN_SECRET as string);
  } catch (err) {
    logger.error(err);
    throw err;
  }
};
