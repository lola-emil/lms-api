import type { Request, Response } from "express";
import type { User } from "../../repositories/user";
import UserRepo from "../../repositories/user";
import Joi from "joi";
import { ErrorResponse } from "../../utils/response";
import argon from "argon2";
import { revokeToken, signToken, storeToken } from "../../utils/jwt";

const signInBodySchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

export async function signIn(req: Request, res: Response) {
    const body = req.body as User;

    const { error } = signInBodySchema.validate(body, { abortEarly: false });

    if (error)
        throw new ErrorResponse(400, "Validation Error", error.details);

    const matchedUser = await UserRepo.find({ email: body.email });

    if (matchedUser.length == 0 || !(await argon.verify(matchedUser[0].password, body.password)))
        throw new ErrorResponse(400, "Validation Error",
            {
                message: "Incorrect email or password",
                path: [
                    "email"
                ],
                context: {
                    label: "email",
                    key: "password"
                }
            } as Joi.ValidationErrorItem);

    const token = await signToken({
        id: matchedUser[0].id,
        email: body.email,
        role_id: matchedUser[0].role_id
    });
    
    await storeToken(matchedUser[0].id, token);

    return res.status(200).json({
        token
    });
}


export async function logout(req: Request, res: Response) {
    const user = res.locals.user;
    await revokeToken(user.id);
    res.json({ message: "Logged out successfully" });
}