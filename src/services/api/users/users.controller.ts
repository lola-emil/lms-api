import usersRepo from "./users.repo";
import { Request, Response } from "express";
import { validateUser } from "./users.validator";
import { ErrorResponse } from "../../../utils/response";

async function get(req: Request, res: Response) {
    const query = req.query
    const users = await usersRepo.find(query);
    return res.status(200).json(users)
}

async function post(req: Request, res: Response) {
    const body = req.body;
    const error = await validateUser(body);

    if (error)
        throw new ErrorResponse(400, "Validation Error", error);

}

async function patch(req: Request, res: Response) {}

async function del(req: Request, res: Response) {
    const id = req.params.id;
    
    await usersRepo.update(id, {

    })
}


export {
    get,
    post,
    patch,
    del
}