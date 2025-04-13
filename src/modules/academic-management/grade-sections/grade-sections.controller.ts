import type { Request, Response } from "express";
import gradeSectionsRepo, { GradeSection } from "./grade-sections.repo";
import { validatePatch, validatePost } from "./grade-sections.validator";
import { ErrorResponse } from "../../../utils/response";

async function count(req: Request, res: Response) {
        const result = await gradeSectionsRepo.count();
    
        return res.status(200).json({
            count: result
        })
}

async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await gradeSectionsRepo.find(query);

    return res.status(200).json(result);
}

async function post(req: Request, res: Response) {
    const body = req.body as Partial<GradeSection>;
    const errors = await validatePost(body);

    if (errors)
        throw new ErrorResponse(400, "Validation Error", errors);
    
    const result = await gradeSectionsRepo.insert(body);

    return res.status(200).json(result);
}

async function patch(req: Request, res: Response) { 
    const sectionId = req.params.id;
    const body = req.body;

    const errors = await validatePatch(body);

    if (errors)
        throw new ErrorResponse(400, "Validation Error", errors);

    const result = await gradeSectionsRepo.update(sectionId, body);

    return res.status(200).json(result);
}

async function del(req: Request, res: Response) { }

export {
    count,
    get,
    post,
    patch,
    del
};
