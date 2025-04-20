import type { Request, Response } from "express";
import studentLevelRepo from "./student-level.repo";
import { validateStudentLevel } from "./student-level.validation";
import { ErrorResponse } from "../../../utils/response";


async function count(req: Request, res: Response) {
    const query = req.query;
    const result = await studentLevelRepo.count(query);

    return res.status(200).json({
        count: result
    })
}

async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await studentLevelRepo.find(query);

    return res.status(200).json(result);
}

async function post(req: Request, res: Response) {
    const body = req.body;
    const errors = await validateStudentLevel(body);

    if (errors)
        throw new ErrorResponse(400, "Validation Error", errors);

    const result = await studentLevelRepo.insert(body);

    return res.status(200).json(result);
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