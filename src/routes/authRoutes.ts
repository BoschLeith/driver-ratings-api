import bcrypt from "bcryptjs";
import { Request, Response, Router } from "express";

import {
  findUserByEmail,
  findUserByRefreshToken,
  insertRefreshToken,
  registerUser,
} from "../services/userService";
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken,
} from "../utils/jwt";

const router = Router();

// User registration
router.post("/register", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [existingUser] = await findUserByEmail(email);
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }

    await registerUser({ email, password });
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// User login
router.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const [user] = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const accessToken = generateAccessToken({
      userId: user.id.toString(),
    });

    const refreshToken = generateRefreshToken({
      userId: user.id.toString(),
    });

    await insertRefreshToken(user.id, refreshToken);

    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });
    res.json({ email: user.email, accessToken });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// Refresh access token
router.get("/refresh", async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const refreshToken = cookies.jwt;

  try {
    const [user] = await findUserByRefreshToken(refreshToken);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const verifiedUser = verifyRefreshToken(refreshToken);
    const accessToken = generateAccessToken({
      userId: verifiedUser.userId,
    });

    res.json({ accessToken });
  } catch (error) {
    console.error("Error refreshing access token:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// User logout
router.get("/logout", async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies.jwt) {
    return res.status(204).json({ message: "No content" });
  }

  const refreshToken = cookies.jwt;

  try {
    const [user] = await findUserByRefreshToken(refreshToken);
    if (!user) {
      res.clearCookie("jwt", {
        httpOnly: true,
      });
      return res.status(204).json({ message: "No content" });
    }

    await insertRefreshToken(user.id, "");
    res.clearCookie("jwt", {
      httpOnly: true,
    });
    res.status(204).json({ message: "No content" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
