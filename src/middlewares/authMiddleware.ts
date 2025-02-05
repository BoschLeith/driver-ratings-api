import { NextFunction, Request, Response } from "express";

import { verifyAccessToken } from "../utils/jwt";

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    req.user = verifyAccessToken(token);
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid or expired token" });
  }
};
