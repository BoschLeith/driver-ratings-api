import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";

import morgan from "morgan";
import authRouter from "./routes/authRoutes";
import driverRouter from "./routes/driverRoutes";
import grandPrixRouter from "./routes/grandPrixRoutes";
import raceRouter from "./routes/raceRoutes";
import raterRouter from "./routes/raterRoutes";
import ratingRouter from "./routes/ratingRoutes";
import resultsRouter from "./routes/resultRoutes";
import teamRouter from "./routes/teamRoutes";

const app = express();
const PORT = process.env.PORT || 3000;
const isDev = process.env.NODE_ENV !== "production";
const CORS_ORIGIN = isDev
  ? process.env.CORS_ORIGIN_DEV
  : process.env.CORS_ORIGIN_PROD;

app.use(
  cors({
    origin: CORS_ORIGIN,
    methods: ["GET", "POST", "PUT"],
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
apiRouter.use("/grandPrixs", grandPrixRouter);
apiRouter.use("/races", raceRouter);
apiRouter.use("/raters", raterRouter);
apiRouter.use("/ratings", ratingRouter);
apiRouter.use("/results", resultsRouter);
apiRouter.use("/teams", teamRouter);

app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello, TypeScript with Express!");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
