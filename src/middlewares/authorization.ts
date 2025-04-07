import type { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/response";
import { verifyToken } from "../utils/jwt";
import { db } from "../config/db";

export async function verifyJwtToken(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.header("Authorization");

    if (!authHeader)
        return next(new ErrorResponse(401, "Unauthorized", { message: "Missing token" }));

    const [prefix, token] = authHeader.split(" ");

    if (prefix !== "Bearer" || !token)
        return next(new ErrorResponse(401, "Unauthorized", { message: "Invalid token format" }));

    try {
        const payload = (await verifyToken(token)) as { id: number; email: string; role_id: number; };
        if (!payload)
            return next(new ErrorResponse(401, "Unauthorized", { message: "Invalid token" }));

        res.locals.user = payload; // Store user data for the next middleware
        
        next();
    } catch (error: any) {
        if (error.name === "TokenExpiredError") {
            return next(new ErrorResponse(401, "Unauthorized", { message: "Token expired" }));
        }
        return next(new ErrorResponse(401, "Unauthorized", { message: "Invalid token" }));
    }
}

export async function checkPermissions(req: Request, res: Response, next: NextFunction) {
    const user = res.locals.user;
    if (!user) {
        return next(new ErrorResponse(401, "Unauthorized", { message: "User not found" }));
    }

    const resourceURI = req.baseUrl.replace(/^\/api\//, "");
    const method = req.method.toUpperCase();

    try {
        const permissions = await db("user_role_permissions")
            .where({ role_id: user.role_id, resource: resourceURI })
            .andWhereRaw("JSON_CONTAINS(permissions, JSON_QUOTE(?))", [method]);

        if (permissions.length === 0) {
            return next(new ErrorResponse(403, "Forbidden", { message: "No permission for this action" }));
        }

        next();
    } catch (error) {
        return next(new ErrorResponse(500, "Internal Server Error", error));
    }
}


