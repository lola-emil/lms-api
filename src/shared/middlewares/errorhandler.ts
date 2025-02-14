import { Request, Response, NextFunction } from "express";
import Logger from "../utils/logger";
import { ErrorResponse } from "../utils/response";

export default function errorHandler(error: Error, _req: Request, res: Response, _next: NextFunction): unknown {
    if (error instanceof ErrorResponse) {
        const { status, message, data } = error;
        return res.status(status).json({ message, data });
    }

    Logger.error(`Internal Server Error: ${error.message}\n${error.stack}`);

    // Send a generic message in production
    const errorMessage = process.env.NODE_ENV === "production" ? "Something went wrong" : error.message;

    return res.status(500).json({ message: errorMessage });
}
