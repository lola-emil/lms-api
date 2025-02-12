import { type Request, type Response } from "express";
import UserProfileRepo, { UserProfile } from "../repository/user-profile";
import UserRoleRepo, { UserRoles } from "../repository/user-role";
import UserRepo, { User } from "../repository/user";
import { UserRequestBody, validateUser } from "../validators/user.validator";
import { ErrorResponse } from "../../../shared/utils/response";
import bcrypt from "bcrypt";


export async function insert(req: Request, res: Response) {
    const body = req.body as UserRequestBody;
    const errors = await validateUser(body);


    if (errors)
        throw new ErrorResponse(200, "", errors);

    body.user.password = await bcrypt.hash(body.user.password, 10);
    await UserProfileRepo.insert(body.userProfile);
    const userResult = await UserRepo.insert(body.user);

    return res.status(200).json(userResult);
}

export async function find(req: Request, res: Response) {
    const query = req.query;

    const result = await UserRepo.find(query);

    return res.status(200).json(result);
}

export async function update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const body = req.body as UserRequestBody;

    const matchedUser = await UserRepo.find({ id });

    if (matchedUser.length == 0)
        throw new ErrorResponse(400, "", {
            message: "Invalid ID"
        });

}