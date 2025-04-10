import type { Request, Response } from "express";
import GradeSectionRepo from "../../../repositories/grade-section";
import { GradeSectionBody, validateGradeSection } from "./grade-section.validator";
import { ErrorResponse } from "../../../utils/response";


async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await GradeSectionRepo.find(query);

    return res.status(200).json(result);
}

async function count(req: Request, res: Response) {
    const result = await GradeSectionRepo.count();
    return res.status(200).json({
        count: result
    });
}

async function post(req: Request, res: Response) {
    const body = req.body as GradeSectionBody;

    const errors = await validateGradeSection(body);

    if (errors)
        throw new ErrorResponse(400, "", errors);

    const result = await GradeSectionRepo.insert({
        grade_level_id: body.grade_level_id,
        section_name: body.section_name
    });

    return res.status(200).json(result);
}

async function patch(req: Request, res: Response) { }
async function del(req: Request, res: Response) { }


export {
    get,
    count,
    post,
    patch,
    del
};