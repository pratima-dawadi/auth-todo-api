import express from "express";
import config from "./config";
import Router from "./routes/index.routes";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/logger.middleware";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import cors from "cors";

const app = express();

const limiter = rateLimiter({
  windowMs: 60 * 1000,
  limit: 10,
  message: "Too many requests",
});

app.use(helmet());

app.use(limiter);

const allowedOrigins = ["https://www.test.com"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, origin);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
  })
);

app.use(express.json());
app.use(requestLogger);

app.use(Router);
app.use(notFoundError);
app.use(genericErrorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
