import { Request, Response } from "express";
import presentMessage from "../utils/response";
import FundService from "../services/fund.service";

const fundService = new FundService();

export default class FundController {
  async myAccount(req: Request, res: Response) {
    try {
      let payload = await fundService.myAccount(req.body);
      presentMessage(res, 200, payload, "Account successfully funded");
    } catch (e) {
      presentMessage(res, 400, undefined, e.message);
    }
  }

  async anotherAccount(req: Request, res: Response) {
    try {
      let payload = await fundService.anotherAccount(req.body);
      presentMessage(res, 200, payload, "Transfer successfully");
    } catch (e) {
      presentMessage(res, 400, undefined, e.message);
    }
  }

  async withdraw(req: Request, res: Response) {
    try {
      let payload = await fundService.withdraw(req.body);
      presentMessage(res, 200, payload, "Withdrawn successfully");
    } catch (e) {
      presentMessage(res, 400, undefined, e.message);
    }
  }
}
