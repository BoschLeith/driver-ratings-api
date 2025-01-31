import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "";

export interface UserPayload {
  userId: string;
}

export const generateAccessToken = (userPayload: UserPayload) => {
  if (!ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }
  return jwt.sign(userPayload, ACCESS_TOKEN_SECRET, { expiresIn: "1m" });
};

export const generateRefreshToken = (userPayload: UserPayload) => {
  if (!REFRESH_TOKEN_SECRET) {
    throw new Error("REFRESH_TOKEN_SECRET is not defined");
  }
  return jwt.sign(userPayload, REFRESH_TOKEN_SECRET, { expiresIn: "1d" });
};

export const verifyAccessToken = (token: string): UserPayload => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as UserPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};

export const verifyRefreshToken = (token: string): UserPayload => {
  try {
    return jwt.verify(token, REFRESH_TOKEN_SECRET) as UserPayload;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
