import { Request, Response } from "express";
import { ErrorResponse } from "../../../utils/response";
import classworkAttachmentRepo from "./classwork-attachments.repo";

async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await classworkAttachmentRepo.find(query);

    return res.status(200).json(result);
}

async function post(req: Request, res: Response) { }

async function patch(req: Request, res: Response) { }

async function del(req: Request, res: Response) { }


export {
    get,
    post,
    patch,
    del
};