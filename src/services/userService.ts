import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import db from "../db";
import { InsertUser, users } from "../db/schema/users";

export const registerUser = async (user: InsertUser) => {
  const hashedPassword = await bcrypt.hash(user.password, 10);

  await db.insert(users).values({
    email: user.email,
    password: hashedPassword,
  });
};

export const findUserByEmail = async (email: string) => {
  return await db.select().from(users).where(eq(users.email, email));
};

export const insertRefreshToken = async (
  userId: number,
  refreshToken: string
) => {
  await db.update(users).set({ refreshToken }).where(eq(users.id, userId));
};

export const findUserByRefreshToken = async (refreshToken: string) => {
  return await db
    .select()
    .from(users)
    .where(eq(users.refreshToken, refreshToken));
};
