import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { Request, Response, Router } from "express";
import { Pool } from "pg";

import { drizzle } from "drizzle-orm/node-postgres";
import * as schema from "../db/schema";
import { generateToken } from "../utils/jwt";

const router = Router();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const db = drizzle(pool, { schema });

// User registration route
router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.insert(schema.usersTable).values({
    email,
    password: hashedPassword,
  });

  res.status(201).json({ message: "User registered successfully" });
});

// User login route
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  const user = await db.query.usersTable.findFirst({
    where: eq(schema.usersTable.email, email),
  });

  if (!user) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    res.status(400).json({ message: "Invalid credentials" });
    return;
  }

  const token = generateToken({
    userId: user.id.toString(),
  });
  res.json({ token });
});

export default router;
