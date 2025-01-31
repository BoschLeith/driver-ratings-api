import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import db from "../db";
import { InsertUser, usersTable } from "../db/schema";

export const registerUser = async (userData: InsertUser) => {
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  await db.insert(usersTable).values({
    email: userData.email,
    password: hashedPassword,
  });
};

export const findUserByEmail = async (email: string) => {
  return await db.select().from(usersTable).where(eq(usersTable.email, email));
};

export const insertRefreshToken = async (
  userId: number,
  refreshToken: string
) => {
  await db
    .update(usersTable)
    .set({ refreshToken })
    .where(eq(usersTable.id, userId));
};

export const findUserByRefreshToken = async (refreshToken: string) => {
  return await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.refreshToken, refreshToken));
};
