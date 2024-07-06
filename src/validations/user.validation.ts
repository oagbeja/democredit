import { body } from "express-validator";

export const signupValidationRules = [
  body("username").notEmpty().withMessage("Username is required"),
  body("firstName").notEmpty().withMessage("First Name is required"),
  body("lastName").notEmpty().withMessage("Last Name is required"),
  body("nin")
    .notEmpty()
    .withMessage("NIN is required")
    .isInt({ min: 0 })
    .withMessage("NIN must be an integer")
    .isLength({ min: 11, max: 11 })
    .withMessage("NIN must be exactly 11 digits"),
  body("email").isEmail().withMessage("Email is invalid"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];
