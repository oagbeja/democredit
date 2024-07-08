import express from "express";
import FundController from "../controllers/fund.controller";
import { isAuthenticated, validateRequest } from "../utils/middleware";
import {
  anotherAccountValidationRules,
  myAccountValidationRules,
} from "../validations/fund.validation";

const router = express.Router();
const fundController = new FundController();

router.post(
  "/my-account",
  isAuthenticated,
  validateRequest(myAccountValidationRules),
  fundController.myAccount
);

router.post(
  "/another-account",
  isAuthenticated,
  validateRequest(anotherAccountValidationRules),
  fundController.anotherAccount
);

router.post(
  "/withdraw",
  isAuthenticated,
  validateRequest(myAccountValidationRules),
  fundController.withdraw
);

export default router;
