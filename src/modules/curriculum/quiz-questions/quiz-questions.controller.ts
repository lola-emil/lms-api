import type { Request, Response } from "express";
import quizQuestionsRepo from "./quiz-questions.repo";

async function count(req: Request, res: Response) {
    const query = req.query;
    const result = await quizQuestionsRepo.count(query);

    return res.status(200).json({
        count: result
    })
}

async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await quizQuestionsRepo.find(query);

    return res.status(200).json(result);
}

async function post(req: Request, res: Response) { }
async function patch(req: Request, res: Response) { }
async function del(req: Request, res: Response) { }

export {
    count,
    get,
    post,
    patch,
    del
};