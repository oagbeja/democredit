import express from "express";
import UserService from "../services/user.service";
import { validateRequest } from "../utils/middleware";
import { signupValidationRules } from "../validations/user.validation";

const router = express.Router();
const userService = new UserService();

router.post(
  "/signup",
  validateRequest(signupValidationRules),
  userService.signupUser
);

export default router;
