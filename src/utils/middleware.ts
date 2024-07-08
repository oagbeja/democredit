// middleware.ts
import { Request, Response, NextFunction } from "express";
import { validationResult, ValidationChain } from "express-validator";
import presentMessage from "./response";
import { verifyToken } from "./jwt";

export const validateRequest = (validators: ValidationChain[]) => {
  return [
    ...validators,
    // @ts-ignore
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return presentMessage(res, 400, errors.array(), "Validation Error");
        // return res.status(400).json({ errors: errors.array() });
      }
      next();
    },
  ];
};

// Middleware function to check if the user is authenticated
export const isAuthenticated = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // Get the token from the request headers
    const token = req.headers.authorization;

    // Check if token is present
    if (!token) {
      return presentMessage(res, 401, [], "Authorization header missing");
    }
    // Verify JWT token
    let decoded = await verifyToken(token);

    req.body.user = decoded;
    next();
  } catch (err) {
    return presentMessage(res, 401, [], "Unauthenticated User");
  }
};
