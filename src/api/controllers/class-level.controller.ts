import type { Request, Response } from "express";
import type { ClassLevel } from "../../repositories/class-level";
import type { ClassSection } from "../../repositories/class-section";

import ClassLevelRepo from "../../repositories/class-level";
import ClassSectionRepo from "../../repositories/class-section";

import { db } from "../../config/db";
import { ErrorResponse } from "../../utils/response";
import Joi from "joi";

type BodySchema = {
    class_level: Partial<ClassLevel>,
    sections?: Partial<ClassSection>[];
};

const bodySchema = Joi.object({
    class_level: Joi.object({
        name: Joi.string().max(100).required()
    }).required(),
    sections: Joi.array().items(
        Joi.object({
            name: Joi.string().max(100).required()
        })
    ).optional()
});

export async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await ClassLevelRepo.find(query);
    return res.status(200).json(result);
}

export async function insert(req: Request, res: Response) {
    const body = req.body as BodySchema;
    const { error } = bodySchema.validate(body, { abortEarly: false });

    if (error)
        throw new ErrorResponse(400, "Validation Error", error.details);

    const trx = await db.transaction();

    try {
        const classLevelResult = await ClassLevelRepo.insert(body.class_level, trx);

        if (body.sections)
            await ClassSectionRepo.batchInsert(body.sections
                .map(val => ({ ...val, class_level_id: classLevelResult[0] })),
                trx);

        trx.commit();

        return res.status(200).json({ message: "Added successful" });
    }
    catch (error) {
        trx.rollback();
        console.log(error);
        throw new ErrorResponse(500, "Internal Server Error", error);
    }
}

export async function update(req: Request, res: Response) {

}

export async function remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const trx = await db.transaction();
    try {
        await ClassSectionRepo.remove({ class_level_id: id }, trx);
        await ClassLevelRepo.remove({ id });

        trx.commit();

        return res.status(200).json({
            message: "Deleted successfully."
        });
    } catch (error) {
        trx.rollback();
        throw new ErrorResponse(500, "Internal Server Error", error);
    }
}