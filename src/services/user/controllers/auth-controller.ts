import { Request, Response } from "express";
import { validateSignIn } from "../validators/user-validator";
import { ErrorResponse } from "../../../shared/utils/response";
import { sign } from "jsonwebtoken";
import { signToken } from "../../../shared/utils/jwt";
import { JWT_SECRET_KEY } from "../../../config/constants";



export async function signIn(req: Request, res: Response) {
    const body = req.body;

    const errors = await validateSignIn(body);

    if (errors)
        throw new ErrorResponse(400, "", errors);

    const token = await signToken({
        username: body.username
    }, JWT_SECRET_KEY);

    return res.status(200).json({
        token
    });
}
