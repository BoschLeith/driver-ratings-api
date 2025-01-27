import { drizzle } from "drizzle-orm/node-postgres";
import express, { Request, Response } from "express";

import { teamsTable } from "./db/schema";
import authRouter from "./routes/authRouter";

const app = express();
const PORT = process.env.PORT || 3000;

const db = drizzle(process.env.DATABASE_URL!);

app.use(express.json());

app.use("/auth", authRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.get("/teams", async (req: Request, res: Response) => {
  const teams = await db.select().from(teamsTable);
  res.send(teams);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
