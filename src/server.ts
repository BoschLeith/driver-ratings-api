import cookieParser from "cookie-parser";
import express, { Request, Response } from "express";

import authRouter from "./routes/authRoutes";
import driverRouter from "./routes/driverRoutes";
import driverTeamsRouter from "./routes/driverTeamsRoutes";
import raceRouter from "./routes/raceRoutes";
import raterRouter from "./routes/raterRoutes";
import ratingRouter from "./routes/ratingRoutes";
import teamRouter from "./routes/teamRoutes";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRouter);
app.use("/drivers", driverRouter);
app.use("/driverTeams", driverTeamsRouter);
app.use("/races", raceRouter);
app.use("/raters", raterRouter);
app.use("/ratings", ratingRouter);
app.use("/teams", teamRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
