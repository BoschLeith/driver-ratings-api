// userService.ts
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";

import db from "../db";
import { usersTable } from "../db/schema";

export const registerUser = async (email: string, password: string) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(usersTable).values({
    email,
    password: hashedPassword,
  });
};

export const findUserByEmail = async (email: string) => {
  return await db.select().from(usersTable).where(eq(usersTable.email, email));
};
