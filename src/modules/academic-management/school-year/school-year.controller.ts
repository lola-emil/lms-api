import type { Request, Response } from "express";
import schoolYearRepo from "./school-year.repo";
import { validateSchoolYear } from "./school-year.validator";
import { ErrorResponse } from "../../../utils/response";

async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await schoolYearRepo.find(query);
    return result;
}

async function post(req: Request, res: Response) {
    const body = req.body;
    const errors = await validateSchoolYear(body);

    if (errors)
        throw new ErrorResponse(400, "Validation Error", errors);

    const result = await schoolYearRepo.insert(body);
    return res.status(200).json(result);
}

async function patch(req: Request, res: Response) { }

async function del(req: Request, res: Response) { }

export {
    get,
    post,
    patch,
    del
};