import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "";
const ACCESS_TOKEN_EXPIRES_IN =
  Number(process.env.ACCESS_TOKEN_EXPIRES_IN) || 60;

export interface UserPayload {
  userId: string;
}

export const generateAccessToken = (userPayload: UserPayload) => {
  if (!ACCESS_TOKEN_SECRET) {
    throw new Error("ACCESS_TOKEN_SECRET is not defined");
  }
  return jwt.sign(userPayload, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });
};

export const verifyAccessToken = (token: string): UserPayload | undefined => {
  try {
    return jwt.verify(token, ACCESS_TOKEN_SECRET) as UserPayload;
  } catch (error) {
    return undefined;
  }
};
