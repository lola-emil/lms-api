import type { Request, Response } from "express";
import topicsRepo from "./topics.repo";
import lessonRepo from "../lessons/lesson.repo";
import { TopicBody, validateTopic } from "./topics.validator";
import { ErrorResponse } from "../../../utils/response";
import { db } from "../../../config/db";


async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await topicsRepo.find(query);
    return res.status(200).json(result);
}
async function post(req: Request, res: Response) {
    const body = req.body as TopicBody;
    const errors = await validateTopic(body);

    if (errors)
        throw new ErrorResponse(400, "Validation Error", errors);

    const trx = await db.transaction();

    try {
        const [topicId] = await topicsRepo.insert(body.topic, trx);

        if (body.lessons) {
            body.lessons.map(val => ({
                ...val,
                topic_id: topicId
            }));

            await lessonRepo.batchInsert(body.lessons);
        }

        trx.commit();

        return res.status(200).json(topicId);
    } catch (error) {
        trx.rollback();
        throw new ErrorResponse(500, "", error);
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
