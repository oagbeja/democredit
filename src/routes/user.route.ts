import express from "express";
import UserController from "../controllers/user.controller";
import { validateRequest } from "../utils/middleware";
import {
  signupValidationRules,
  loginValidationRules,
} from "../validations/user.validation";

const router = express.Router();
const userController = new UserController();

router.post(
  "/signup",
  validateRequest(signupValidationRules),
  userController.signupUser
);

router.post(
  "/login",
  validateRequest(loginValidationRules),
  userController.login
);

export default router;
