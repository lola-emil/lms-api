import { Request, Response } from "express";
import { validateAuth } from "./auth.validator";
import { ErrorResponse } from "../../utils/response";
import { signToken } from "../../utils/jwt";
import usersRepo from "../api/users/users.repo";
import userRole from "../../repositories/user-role";
import studentClassLevelRepo from "../api/student-class-level/student-class-level.repo";


async function signIn(req: Request, res: Response) {
    const body = req.body;
    const error = await validateAuth(body);

    if (error)
        throw new ErrorResponse(400, "Validation Error", error);

    const matchedUser = await usersRepo.find({
        email: body.email,
    });

    const [role] = await userRole.find({
        id: matchedUser[0].role_id
    });

    const [class_level] = await studentClassLevelRepo.find({
        student_id: matchedUser[0].id
    });

    const token = await signToken({
        id: matchedUser[0].id,
        email: matchedUser[0].email,
        role: role.role_name
    });

    return res.status(200).json({
        user_id: matchedUser[0].id,
        token,
        role: role.role_name,
        section_id: !!class_level ? class_level.class_section_id : ""
    });
}

export { signIn };