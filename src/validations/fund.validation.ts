import { body } from "express-validator";

export const myAccountValidationRules = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number")
    .custom((value, _) => {
      if (parseFloat(value) <= 0) {
        throw new Error("Amount must be a positive number");
      }
      return true;
    }),
];

export const anotherAccountValidationRules = [
  body("amount")
    .notEmpty()
    .withMessage("Amount is required")
    .isNumeric()
    .withMessage("Amount must be a number")
    .custom((value, _) => {
      if (parseFloat(value) <= 0) {
        throw new Error("Amount must be a positive number");
      }
      return true;
    }),
  body("email").isEmail().withMessage("User Email is invalid"),
];
