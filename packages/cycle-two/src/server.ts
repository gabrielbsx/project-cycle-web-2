import express from "express";
import dotenv from "dotenv";
import { routesFactory } from "./routes";
import { errorHandler } from "./errors/error-handler";
import expressPino from "express-pino-logger";

export const logRequest = expressPino({
  level: "info",
  enabled: true,
});

dotenv.config();

const { PORT } = process.env;

const app = express();

app.use(logRequest);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

routesFactory(app);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log("Server listening on port 3000");
});
