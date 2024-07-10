import express from "express";
import config from "./config";
import Router from "./routes/index.routes";

const app = express();

app.use(express.json());

app.use(Router);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
