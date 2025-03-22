import type { Request, Response } from "express";
import type { ClassSection } from "../../repositories/class-section";

import ClassSectionRepo from "../../repositories/class-section";
import Joi from "joi";
import { ErrorResponse } from "../../utils/response";

const bodySchema = Joi.object({
    name: Joi.string().max(100).required(),
    class_level_id: Joi.number().required()
});

export async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await ClassSectionRepo.find(query);

    return res.status(200).json(result);
}

export async function insert(req: Request, res: Response) {
    const body = req.body as Partial<ClassSection>;
    const { error } = bodySchema.validate(body, { abortEarly: false });

    if (error)
        throw new ErrorResponse(400, "Validation Error", error.details);

    const result = await ClassSectionRepo.insert(body);

    return res.status(200).json(result);
}

export async function update(req: Request, res: Response) { }

export async function remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const result = await ClassSectionRepo.remove({ id });

    return res.status(200).json(result);
}