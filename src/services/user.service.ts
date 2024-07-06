import logger from "../utils/logger";
import { loginInput, sigupInput } from "../utils/interfaces";
import db from "../utils/db";
import { comparePasswords, hashPassword } from "../utils/bcryptHelper";
import { signToken } from "../utils/jwt";

export default class UserService {
  async signupUser(input: sigupInput) {
    try {
      const { password, firstName, lastName, nin, email } = input;
      //fetch for duplicates
      let result = await db("users").where({ nin }).orWhere({ email }).first();
      if (result) {
        throw "User already exists";
      }

      const hashedPassword = await hashPassword(password);

      result = await db("users").insert({
        password: hashedPassword,
        first_name: firstName,
        last_name: lastName,
        nin,
        email,
      });

      let id = result[0];

      //Add to db and send jwt token
      return { token: signToken({ firstName, email, id, lastName }) };
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  }

  async login(input: loginInput) {
    try {
      const { password, email } = input;
      //fetch for duplicates
      let result = await db("users").where({ email }).first();
      if (!result) {
        throw "User not found";
      }

      console.log(result);
      // return;
      const isMatched = await comparePasswords(password, result.password);
      if (!isMatched) throw "Invalid password";

      let { id, last_name: lastName, first_name: firstName } = result;

      //Add to db and send jwt token
      return { token: signToken({ firstName, email, id, lastName }) };
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  }
}
