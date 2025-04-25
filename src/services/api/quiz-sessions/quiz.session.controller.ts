import { Request, Response } from "express";
import { ErrorResponse } from "../../../utils/response";
import quizSessionRepo, { QuizSession } from "./quiz-session.repo";
import { Question } from "../questions/question.repo";
import { Choice } from "../choices/choice.repo";
import { db } from "../../../config/db";

interface KatungBody {
    selectedAnswers: Choice[];
    questions: any[];
    student_id: number;
    quiz_id: number;
}

async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await quizSessionRepo.find(query);

    return res.status(200).json(result);
}

async function post(req: Request, res: Response) {
    const body = req.body as KatungBody;
    console.log(JSON.stringify(body));

    const hps = body.questions.length;

    let score = 0;

    // Calculate score
    for (let i = 0; i < body.selectedAnswers.length; i++) {
        const answer = body.selectedAnswers[i];

        if (answer.is_correct)
            score += 1;
    }

    const trx = await db.transaction();
    try {
        
        await quizSessionRepo.insert({
            hps,
            score,
            quiz_id: body.quiz_id,
            student_id: body.student_id
        }, trx);

        await trx.commit();


        return res.status(200).json({
            score,
            hps
        });
    } catch (error) {

        trx.rollback();

        throw new ErrorResponse(500, "Internal Server Error", error);
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