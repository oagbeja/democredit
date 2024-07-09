import logger from "../utils/logger";
import { anotherAccountInput, myAccountInput } from "../utils/interfaces";
import db from "../utils/db";

export default class FundService {
  async myAccount(input: myAccountInput) {
    try {
      const {
        amount: addedAmount,
        user: { userId },
      } = input;

      let { amount } = await db("wallets")
        .where({ user_id: userId })
        .first("amount");

      if (typeof amount !== "number") {
        throw "User with invalid initial amount";
      }
      amount = amount + addedAmount;

      await db.transaction(async (trx) => {
        await trx("wallets").where({ user_id: userId }).update({
          amount,
        });

        await trx("transactions").insert({
          payer_id: userId,
          payee_id: userId,
          amount: addedAmount,
          settled: true,
          description: "Fund My Account",
        });
      });

      return { amount };
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  }

  async anotherAccount(input: anotherAccountInput) {
    try {
      const {
        amount: addedAmount,
        email: otherUserEmail,
        user: { userId, email },
      } = input;

      //fetch for duplicates
      let otherUserEmailTrimmed = String(otherUserEmail).trim();
      if (otherUserEmailTrimmed.toLowerCase() === email)
        throw "Not applicable. Try using fund my account module";

      let otherUser = await db("users")
        .where({ email: otherUserEmailTrimmed })
        .first("id");

      if (!otherUser) throw "user does not exist";
      let otherUserId = otherUser.id;

      let { amount } = await db("wallets")
        .where({ user_id: userId })
        .first("amount");

      if (typeof amount !== "number") {
        throw "User with invalid initial amount";
      }

      if (amount < addedAmount)
        throw "Insufficient amount. Unable to transfer funds";

      let { amount: otherUserAmount } = await db("wallets")
        .where({ user_id: otherUserId })
        .first("amount");

      if (typeof otherUserAmount !== "number") {
        throw "Fundee User with invalid initial amount";
      }

      amount -= addedAmount;
      otherUserAmount += addedAmount;

      await db.transaction(async (trx) => {
        await trx("wallets").where({ user_id: userId }).update({
          amount,
        });

        await trx("wallets").where({ user_id: otherUserId }).update({
          amount: otherUserAmount,
        });

        await trx("transactions").insert({
          payer_id: userId,
          payee_id: otherUserId,
          amount: addedAmount,
          description: "Fund Another User's Account",
          settled: true,
        });
      });

      return { amount };
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  }

  async withdraw(input: myAccountInput) {
    try {
      const {
        amount: subtractedAmount,
        user: { userId },
      } = input;

      let { amount } = await db("wallets")
        .where({ user_id: userId })
        .first("amount");

      if (typeof amount !== "number") {
        throw "User with invalid initial amount";
      }
      if (amount < subtractedAmount) throw "Insufficient amount to withdraw";

      amount -= subtractedAmount;
      await db.transaction(async (trx) => {
        await trx("wallets").where({ user_id: userId }).update({
          amount,
        });

        await trx("transactions").insert({
          payer_id: userId,
          amount: subtractedAmount,
          description: "Withdraw From My Account",
        });
      });

      return { amount };
    } catch (e) {
      logger.error(e);
      throw new Error(e);
    }
  }
}
