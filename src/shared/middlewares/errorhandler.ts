import { Request, Response, NextFunction } from "express";
import Logger from "../utils/logger";
import { ErrorResponse } from "../lib/response";


export default function errorHandler(error: Error, req: Request, res: Response, _next: NextFunction): unknown {

    if (error instanceof ErrorResponse) {
        const status = (<ErrorResponse>error).status;
        const message = (<ErrorResponse>error).message;
        const payload = (<ErrorResponse>error).payload;
        return res.status(status).json({
            status,
            message,
            data: payload
        });
    } else {
        Logger.error("Internal Server Error: " + error.message)
        return res.status(500).json({
            status: 500,
            message: "Internal Server Error: " + error.message
        })
    }
}