import type { Request, Response, NextFunction } from "express";
import { ErrorResponse } from "../utils/response";
import { revokeToken, verifyToken } from "../utils/jwt";
import UserRoleRepo from "../repositories/user-role";
import UserRolePermissionRepo from "../repositories/user-role-permission";

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
    if (!user) 
        return next(new ErrorResponse(401, "Unauthorized", { message: "User not found" }));

    const role = (await UserRoleRepo.find({ id: user.role_id }))[0];
    if (!role) 
        return next(new ErrorResponse(403, "Forbidden", { message: "Role not found" }));

    const resourceURI = req.baseUrl.replace(/^\/api\//, "");

    const permissions = await UserRolePermissionRepo.find({
        role_id: role.id,
        permission: req.method.toUpperCase() as any,
        resource: resourceURI
    });

    if (permissions.length === 0) 
        return next(new ErrorResponse(403, "Forbidden", { message: "No permission for this action" }));

    next();
}

