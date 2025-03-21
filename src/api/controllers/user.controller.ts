import type { Request, Response } from "express";
import UserRepo, { User } from "../../repositories/user";
import Joi from "joi";
import { ErrorResponse } from "../../utils/response";
import { db } from "../../config/db";
import argon from "argon2";

type BodySchema = Partial<User>;


const bodySchema = Joi.object({
    // profile: Joi.object({
    // id_number: Joi.string().max(255).required(), 
    fname: Joi.string().max(255).required(),
    mname: Joi.string().max(255).optional().allow(null, ""),
    lname: Joi.string().max(255).required(),
    // picture: Joi.string().uri().optional().allow(null, ""),

    address: Joi.string().max(255).optional().allow(null, ""),
    city: Joi.string().max(255).optional().allow(null, ""),

    email: Joi.string().email().max(255).required(),
    password: Joi.string().min(8).max(255).required(),

    role_id: Joi.number().integer().positive().required()

});


export async function get(req: Request, res: Response) {
    const query = req.query;
    const roles = await UserRepo.find(query);

    return res.status(200).json(roles);
}

export async function insert(req: Request, res: Response) {
    const body = req.body as BodySchema;
    const { error } = bodySchema.validate(body, { abortEarly: false });

    if (error)
        throw new ErrorResponse(400, "Validation Error", error.details);

    const matchedUser = await UserRepo.find({ email: body.email });

    if (matchedUser.length > 0)
        throw new ErrorResponse(400, "Validation Error", {
            message: "Email already used.",
            path: ["email"],
            context: {
                key: "email",
                label: "email"
            }
        } as Joi.ValidationErrorItem);

    const trx = await db.transaction();

    try {
        body.password = await argon.hash(body.password!);
        const userResult = await UserRepo.insert(body, trx);

        trx.commit();
        return res.status(200).json(userResult);
    } catch (error) {
        trx.rollback();
        throw new ErrorResponse(500, "Internal Server Error", error);
    }
}


export async function remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    await UserRepo.remove({ id });

    return res.status(200).json({
        message: "Deleted successfully."
    });

}