import type { Request, Response } from "express";
import lessonRepo from "./lesson.repo";


async function count(req: Request, res: Response) {
    const query = req.query;
    const result = await lessonRepo.count(query);

    return res.status(200).json({
        count: result
    })
}

async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await lessonRepo.find(query);

    return res.status(200).json(result);
}

async function post(req: Request, res: Response) { 
    
}

async function patch(req: Request, res: Response) { }

async function del(req: Request, res: Response) { }

export {
    count,
    get,
    post,
    patch,
    del
};