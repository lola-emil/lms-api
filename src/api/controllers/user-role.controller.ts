import type { Request, Response } from "express";
import type { UserRole } from "../../repositories/user-role";
import type { UserRolePermission } from "../../repositories/user-role-permission";
import UserRoleRepo from "../../repositories/user-role";
import UserRolePermissionRepo from "../../repositories/user-role-permission";
import Joi from "joi";
import { ErrorResponse } from "../../utils/response";
import { db } from "../../config/db";

type BodySchema = {
    name: string,
    description: string,
    permissions: UserRolePermission[];
};

const bodySchema = Joi.object({
    name: Joi.string().max(255).required(),
    permissions: Joi.array()
        .items(
            Joi.object({
                resource: Joi.string().required(),
                permission: Joi.string().required()
            })
        )
        .min(1)
        .required()
});



export async function get(req: Request, res: Response) {
    const query = req.query;
    const roles = await UserRoleRepo.find(query);

    return res.status(200).json(roles);
}

export async function insert(req: Request, res: Response) {
    const body = req.body as BodySchema;
    const { error } = bodySchema.validate(body, { abortEarly: false });

    if (error)
        throw new ErrorResponse(400, "Validation Error", error.details);

    const trx = await db.transaction();

    try {
        const userRoleResult = await UserRoleRepo.insert({
            name: body.name,
            description: body.description
        }, trx);
        const userRolePermissionResult = await UserRolePermissionRepo
            .batchInsert(body.permissions.map(val => ({ ...val, role_id: userRoleResult[0] })), trx);

        trx.commit();

        return res.status(200).json({
            result: { userRoleResult, userRolePermissionResult }
        });
    } catch (error) {
        trx.rollback();
        throw new ErrorResponse(500, "Internal Server Error", error);
    }
}


export async function remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const trx = await db.transaction();
    try {
        await UserRolePermissionRepo.remove({
            role_id: id
        }, trx);
        await UserRoleRepo.remove({ id }, trx);

        trx.commit();
        return res.status(200).json({
            message: "Deleted successfully."
        });
    } catch (error) {
        trx.rollback();
        throw new ErrorResponse(500, "Internal Server Error", error);
    }

}