import { type Request, type Response } from "express";
import UserProfileRepo, { UserProfile } from "../repository/user-profile";
import UserRoleRepo, { UserRoles } from "../repository/user-role";
import UserRepo, { User } from "../repository/user";
import { UserRequestBody } from "../validators/user.validator";



export async function insert(req: Request, res: Response) {
    const body = req.body as UserRequestBody;

    
}

export async function find(req: Request, res: Response) {

}

export async function update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const body = req.body as UserRequestBody;

    const matchedUser = await UserRepo.find({ id });

}