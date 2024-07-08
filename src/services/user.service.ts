import logger from "../utils/logger";
import { User, loginInput, sigupInput } from "../utils/interfaces";
import db from "../utils/db";
import { comparePasswords, hashPassword } from "../utils/bcryptHelper";
import { signToken } from "../utils/jwt";
import axios from "axios";

export default class UserService {
  async signupUser(input: sigupInput) {
    try {
      const { password, firstName, lastName, nin, email } = input;

      let isBlacklisted = await this.isBlacklisted(email);
      if (isBlacklisted) throw "401****Sorry, you are Karma blacklisted";

      //fetch for duplicates
      let result = await db("users").where({ nin }).orWhere({ email }).first();
      if (result) {
        throw "401****User already exists";
      }

      const hashedPassword = await hashPassword(password);
      let userObject = {};
      await db.transaction(async (trx) => {
        let [userId] = await trx("users").insert({
          password: hashedPassword,
          first_name: firstName,
          last_name: lastName,
          nin,
          email,
        });

        let [walletId] = await trx("wallets").insert({
          user_id: userId,
        });

        const { uuid } = await trx("users").where({ id: userId }).first("uuid");
        const { uuid: walletUuid, amount } = await trx("wallets")
          .where({ id: walletId })
          .first("uuid", "amount");

        userObject = {
          token: signToken({
            firstName,
            email,
            id: uuid,
            lastName,
          }),
          firstName,
          email,
          id: uuid,
          lastName,
          walletId: walletUuid,
          amount,
        };
      });

      // create a new wallet

      //Add to db and send jwt token
      return userObject;
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

      let { uuid, last_name: lastName, first_name: firstName, id } = result;
      result = await db("wallets").where({ user_id: id }).first();
      let { uuid: walletId, amount } = result;

      //Add to db and send jwt token
      return {
        token: signToken({
          firstName,
          email,
          id: uuid,
          lastName,
        }),
        firstName,
        email,
        id: uuid,
        lastName,
        walletId,
        amount,
      };
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  }

  async getUserId(user: User): Promise<boolean | number> {
    try {
      let { id: uuid, firstName, lastName, email } = user;
      let { id } = await db("users")
        .where({ uuid, first_name: firstName, last_name: lastName, email })
        .first("id");
      return id ? id : false;
    } catch (e) {
      throw e;
    }
  }

  async isBlacklisted(email: string) {
    try {
      let url = `https://adjutor.lendsqr.com/verification/karma/$${email}`;
      const headers = {
        Authorization: `Bearer ${process.env.LENDQR_API_KEY}`,
        "Content-Type": "application/json",
      };

      await axios.get(url, { headers });
      return true;
    } catch (e) {
      if (e.response.status === 404) return false;
      throw "500****Network issues with LendQr";
    }
  }
}
