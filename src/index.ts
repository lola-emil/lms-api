import express, { ErrorRequestHandler } from "express";
import http from "http";
import helmet from "helmet";
import cors from "cors";

import Logger from "./utils/logger";
import { ErrorResponse } from "./lib/response";
import { PORT } from "./config/constants";

import fs from "fs";
import errorHandler from "./middlewares/errorhandler";

export const app = express();
export const server = http.createServer(app);


app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


// 404 Error
app.use("*", (req, res) => {
    let message = `Can't ${req.method} ${req.originalUrl}`;
    Logger.error(message);
    throw new ErrorResponse(404, message, {});
});


app.use(errorHandler as ErrorRequestHandler);


server.listen(PORT, () =>
    Logger.success(`Server is running on http://localhost:${PORT}`)
);
