import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";

import authRouter from "./routes/authRoutes";
import driverRouter from "./routes/driverRoutes";
import driverTeamsRouter from "./routes/driverTeamsRoutes";
import raceRouter from "./routes/raceRoutes";
import raterRouter from "./routes/raterRoutes";
import ratingRouter from "./routes/ratingRoutes";
import teamRouter from "./routes/teamRoutes";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || 3000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://127.0.0.1:5173";

app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/drivers", driverRouter);
apiRouter.use("/driverTeams", driverTeamsRouter);
apiRouter.use("/races", raceRouter);
apiRouter.use("/raters", raterRouter);
apiRouter.use("/ratings", ratingRouter);
apiRouter.use("/teams", teamRouter);

app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
