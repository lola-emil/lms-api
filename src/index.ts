import express from "express";
import http from "https";
import helmet from "helmet";
import cors from "cors";

import Logger from "./utils/logger";
import { ErrorResponse } from "./lib/response";
import { PORT } from "./config/constants";

import fs from "fs";

export const app = express();
export const server = http.createServer({
    cert: fs.readFileSync("sfroot-g2.crt")
}, app);


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


server.listen(PORT, () =>
    Logger.success(`Server is running on http://localhost:${PORT}`)
);
