// middleware.ts
import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";

export const validateRequest = (validators: ValidationChain[]) => {
  return [
    ...validators,
    // @ts-ignore
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};
