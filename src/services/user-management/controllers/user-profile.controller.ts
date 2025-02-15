import { type Request, type Response } from "express";
import UserProfileRepo from "../repository/user-profile";
import { validateProfileUpdate } from "../validators/user-profile.validator";
import { ErrorResponse } from "../../../shared/utils/response";


export async function insert(req: Request, res: Response) {
    const body = req.body;
    
}

export async function find(req: Request, res: Response) {
    const query = req.query;
    const result = await UserProfileRepo.find(query);

    return res.status(200).json(result);
}

export async function update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const body = req.body;

    const matchedProfile = await UserProfileRepo.find({ id });

    if (matchedProfile.length == 0)
        throw new ErrorResponse(400, "", {
            message: "Invalid id"
        });

    const errors = await validateProfileUpdate(body);

    if (errors)
        throw new ErrorResponse(400, "", errors);

    const result = await UserProfileRepo.update(id, body);

    return res.status(200).json(result);
}   