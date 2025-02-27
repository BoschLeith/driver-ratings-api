import bcrypt from "bcryptjs";
import { Request, Response, Router } from "express";

import {
  findUserByEmail,
  findUserById,
  registerUser,
} from "../services/userService";
import { generateAccessToken, verifyAccessToken } from "../utils/jwt";

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

    res.json({ email: user.email, accessToken });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

router.get("/validate", async (req: Request, res: Response) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Access token is missing" });
  }

  try {
    const decoded = verifyAccessToken(token);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid access token" });
    }

    const [user] = await findUserById(decoded.userId);

    return res.status(200).json({ user: user.email });
  } catch (error) {
    console.error("Error validating token:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

export default router;
