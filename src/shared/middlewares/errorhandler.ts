import { Request, Response, NextFunction } from "express";
import Logger from "../utils/logger";
import { ErrorResponse } from "../utils/response";


export default function errorHandler(error: Error, req: Request, res: Response, _next: NextFunction): unknown {

    console.log(error);

    if (error instanceof ErrorResponse) {
        const status = (<ErrorResponse>error).status;
        const message = (<ErrorResponse>error).message;
        const data = (<ErrorResponse>error).data;
        return res.status(status).json({
            message,
            data
        });
    } else {
        Logger.error("Internal Server Error: " + error.message)
        return res.status(500).json({
            message: "Internal Server Error: " + error.message
        })
    }
}