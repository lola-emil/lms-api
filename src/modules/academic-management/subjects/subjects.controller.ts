import type { Request, Response } from "express";
import subjectRepo from "./subject.repo";
import { SubjectBody, validatePost } from "./subject.validator";
import { ErrorResponse } from "../../../utils/response";
import { error } from "winston";
import { db } from "../../../config/db";
import topicsRepo from "../topics/topics.repo";

async function get(req: Request, res: Response) { 
    const query = req.query;
    const result = await subjectRepo.find(query);

    return res.status(200).json(result);
}
async function post(req: Request, res: Response) { 
    const body = req.body as SubjectBody;
    const errors = await validatePost(body);

    if (errors)
        throw new ErrorResponse(400, "Validation Error", error);

    const trx = await db.transaction();

    try {
        const subjectResult = await subjectRepo.insert(body.subject, trx);
        let topicResult: number[] | null = null;
        
        if (body.topics) {
            body.topics.map(val => ({
                ...val,
                subject_id: subjectResult[0]
            }));

            topicResult = await topicsRepo.batchInsert(body.topics, trx)
        }
        await trx.commit();
    } catch (error) {
        await trx.rollback();
    }
}
async function patch(req: Request, res: Response) { }
async function del(req: Request, res: Response) { }

export {
    get,
    post,
    patch,
    del
};
