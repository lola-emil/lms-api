import { type Request, type Response } from "express";
import UserProfileRepo from "../repository/user-profile";


export async function insert(req: Request, res: Response) {
    const body = req.body;
        
}

export async function find(req: Request, res: Response) {
    const query = req.query;
    const result = await UserProfileRepo.find(query);

    return res.status(200).json(result);
}

export async function update(req: Request, res: Response) {
    const id = req.params.id;
    const body = req.body;

    return res.status(200).json({
        message: "Updated successfully"
    });
}