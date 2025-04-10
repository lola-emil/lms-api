import type { Request, Response } from "express";
import Topic from "../../../repositories/topics";



async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await Topic.find(query);

    return res.status(200).json(result);
}

async function count(req: Request, res: Response) {
    const result = await Topic.count();
    return res.status(200).json({
        count: result
    })
}

async function post(req: Request, res: Response) {}

async function patch(req: Request, res: Response) { }

async function del(req: Request, res: Response) {}


export {
    get,
    count,
    post,
    patch,
    del
};