import type { Request, Response } from "express";
import User from "../../../repositories/user";
import UserProfile from "../../../repositories/user-profile";

import StudentGradeLevel from "../../../repositories/student-grade-level";

import { UserBody, validateUser } from "./user.validator";
import { ErrorResponse } from "../../../utils/response";
import { db } from "../../../config/db";
import argon2 from "argon2";



async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await User.find(query);

    return res.status(200).json(result);
};

async function count(req: Request, res: Response) {
    const result = await User.count();
    return res.status(200).json({
        count: result
    })
}

async function post(req: Request, res: Response) {
    const body = req.body as UserBody;

    if (body.role == "student")
        body.enrolled_subjects = undefined;

    if (body.role == "teacher")
        body.student_info = undefined;

    // validate ang body
    const errors = await validateUser(body);

    if (errors)
        throw new ErrorResponse(400, "Validation error", errors);


    const trx = await db.transaction();

    try {

        body.password = await argon2.hash(body.password);

        const [userId] = await User.insert({
            email: body.email,
            password: body.password
        }, trx);

        const [] = await UserProfile.insert({
            fname: body.firstname,
            mname: body.middlename,
            lname: body.lastname,
            address: body.address,
            user_id: userId
        }, trx);


        if (body.role == "student") {
            const [] = await StudentGradeLevel.insert({
                student_id: userId,
                school_year_id: 1,

                grade_level_id: body.student_info!.grade_level_id,
                grade_section_id: body.student_info!.grade_section_id
            }, trx);
        }

        if (body.role == "teacher") {

        }

        trx.commit();

        return res.status(200).json({
            message: "Added successfully",
            data: { userId }
        });
    } catch (error) {
        trx.rollback();
        throw new ErrorResponse(500, "", error);
    }
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