import type { Request, Response } from "express";
import UserRolePermissionRepo from "../../repositories/user-role-permission";
import Joi from "joi";
import { ErrorResponse } from "../../utils/response";
import { db } from "../../config/db";

type BodySchema = {
    role_id: number,
    resource: string,
    permissions: ("GET" | "PATCH" | "DELETE" | "POST")[];
};

const bodySchema = Joi.object({
    role_id: Joi.number().required(),
    resource: Joi.string().max(255).required(),
    permissions: Joi.array().items(Joi.string().valid("GET", "PATCH", "DELETE", "POST")).required()
});


export async function get(req: Request, res: Response) {
    const query = req.query;
    const roles = await UserRolePermissionRepo.find(query);

    return res.status(200).json(roles);
}

export async function insert(req: Request, res: Response) {
    const body = req.body as BodySchema;
    const { error } = bodySchema.validate(body, { abortEarly: false });

    if (error)
        throw new ErrorResponse(400, "Validation Error", error.details);

    const userRoleResult = await UserRolePermissionRepo.insert({
        role_id: body.role_id,
        resource: body.resource,
        permissions: JSON.stringify(body.permissions)
    });


    return res.status(200).json({
        result: { userRoleResult }
    });
}

export async function remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const result = await UserRolePermissionRepo.remove({id});

    return res.status(200).json(result);
}