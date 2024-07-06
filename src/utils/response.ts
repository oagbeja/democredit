import { Response } from "express";
import logger from "./logger";

const presentMessage = (
  res: Response,
  statusCode: number,
  payload?: any,
  message?: string | []
) => {
  let statusFlag = String(statusCode).indexOf("2") === 0;
  res.status(statusCode).json({
    payload: statusFlag ? payload : undefined,
    errors: !statusFlag ? payload : undefined,
    message: message ?? null,
    status: statusFlag,
  });
  return;
};

export const statusCodeMessage = (
  code: number,
  message: string | any[],
  payload?: any
) => {
  return JSON.stringify({ code, message, payload });
};

interface StatusCodeMessage {
  code: number;
  message: any;
  payload: any;
}

export const presentErrorMessage = (res: Response, codeMessage: string) => {
  try {
    logger.info(codeMessage);
    const { code, message, payload }: StatusCodeMessage =
      JSON.parse(codeMessage);
    presentMessage(res, code, payload, message);
  } catch (err) {
    // logger.error(err);
    throw new Error(err);
  }
};

export default presentMessage;
