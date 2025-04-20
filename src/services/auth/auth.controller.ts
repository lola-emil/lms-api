import type { Request, Response } from "express";
import { validateSignIn } from "./auth.validator";
import { ErrorResponse } from "../../utils/response";
import userRepo from "../../modules/user-management/users/user.repo";
import userRolesRepo from "../../modules/user-management/user-roles/user-roles.repo";
import { signToken } from "../../utils/jwt";

async function signIn(req: Request, res: Response) {
    const body = req.body;
    const errors = await validateSignIn(body);

    if (errors)
        throw new ErrorResponse(400, "Validation Error", errors);

    const [matchedUser] = await userRepo.find({
        email: body.email
    });

    const [role] = await userRolesRepo.find({
        id: matchedUser.user_role_id
    });

    const token = await signToken({
        user_id: matchedUser.id,
        email: matchedUser.email,
        role: role.role_name
    });

    return res.status(200).json({
        user_id: matchedUser.id,
        role: role.role_name,
        token
    });
}

export {
    signIn
};