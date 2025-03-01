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

export const findUserById = async (id: string) => {
  return await db
    .select()
    .from(users)
    .where(eq(users.id, Number(id)));
};
