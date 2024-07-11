import express from "express";
import config from "./config";
import Router from "./routes/index.routes";
import { genericErrorHandler, notFoundError } from "./middleware/errorHandler";
import { requestLogger } from "./middleware/logger.middleware";

const app = express();

app.use(express.json());
app.use(requestLogger);

app.use(Router);
app.use(notFoundError);
app.use(genericErrorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
