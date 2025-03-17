import { Request, Response, NextFunction } from "express";
import Logger from "../utils/logger";
import { ApiResponse } from "../utils/response";

export default function errorHandler(
    error: Error,
    _req: Request,
    res: Response,
    _next: NextFunction
): unknown {
    if (error instanceof ApiResponse) {
        const { statusCode, message, data, errors } = error;
        return res.status(statusCode).json(new ApiResponse(statusCode, message, data, errors));
    }

    Logger.error(`Internal Server Error: ${error.message}\n${error.stack}`);

    const errorMessage = process.env.NODE_ENV === "production" ? "Something went wrong" : error.message;
    return res.status(500).json(new ApiResponse(500, errorMessage));
}