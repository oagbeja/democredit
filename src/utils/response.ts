import { Response } from "express";
import logger from "./logger";

const presentMessage = (
  res: Response,
  statusCode: number,
  payload?: any,
  message?: string | []
) => {
  let statusFlag = String(statusCode).indexOf("2") === 0;
  //sometimes change the default status code
  if (typeof message === "string") {
    let splitMessage = message.split("****");
    const statusCodePattern = /^[1-5][0-9]{2}$/;
    if (statusCodePattern.test(splitMessage[0])) {
      statusCode = parseInt(splitMessage[0]);
      message = splitMessage[1] ?? "";
    }
  }

  res.status(statusCode).json({
    data: statusFlag ? payload : undefined,
    errors: !statusFlag ? payload : undefined,
    message: message ?? null,
    status: statusFlag ? "success" : "error",
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
