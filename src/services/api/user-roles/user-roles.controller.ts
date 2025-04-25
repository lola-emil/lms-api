import { Request, Response } from "express";
import userProfileRepo from "./user-roles.repo";

async function get(req: Request, res: Response) {
    const query = req.query
    const users = await userProfileRepo.find(query);
    return res.status(200).json(users)
}

async function post(req: Request, res: Response) {

}

async function patch(req: Request, res: Response) {}

async function del(req: Request, res: Response) {

}


export {
    get,
    post,
    patch,
    del
}