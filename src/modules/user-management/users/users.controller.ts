import type { Request, Response } from "express";
import userRepo from "./user.repo";
import userProfileRepo from "../user-profiles/user-profile.repo";
import { UserPatchBody, UserPostBody, validatePost, validateUpdate } from "./user.validator";
import { ErrorResponse } from "../../../utils/response";
import { db } from "../../../config/db";
import argon2 from "argon2";
import csvToObj from "csvtojson";
import path from "path";


async function count(req: Request, res: Response) {
    const query = req.query;
    const result = await userRepo.count(query);

    return res.status(200).json({
        count: result
    });
}

async function bulkImport(req: Request, res: Response) {

    if (!req.file)
        throw new ErrorResponse(400, "", {});

    const supportedTypes = [
        "text/csv",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
    ];

    const matchedType = supportedTypes.includes(req.file.mimetype);

    if (!matchedType)
        throw new ErrorResponse(400, "", {
            message: "File not supported"
        });

    if (req.file.size > 5e7)
        throw new ErrorResponse(400, "", {
            message: "File too large"
        });

    const data = await csvToObj().fromFile(path.join(__dirname, "../../../../temp/" + req.file.filename));

    for (let i = 0; i < data.length; i++) {
        const trx = await db.transaction();
        try {
            const [userResult] = await userRepo.insert({
                email: data[i].email,
                password: data[i].password,
                user_role_id: 2
            }, trx);

            await userProfileRepo.insert({
                fname: data[i].fname,
                lname: data[i].lname,
                user_id: userResult
            }, trx);
            trx.commit();
        } catch (error) {
            console.log(error);
            trx.rollback();
        }
    }

    return res.status(200).json({
        message: "File Received"
    });
}

async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await userRepo.find(query);

    return res.status(200).json(result);
}
async function post(req: Request, res: Response) {
    const body = req.body as UserPostBody;
    const errors = await validatePost(body);

    if (errors)
        throw new ErrorResponse(400, "Validation error", errors);

    const trx = await db.transaction();

    try {
        body.credential.password = await argon2.hash(body.credential.password);

        const userResult = await userRepo.insert(body.credential, trx);

        body.profile.user_id = userResult[0];
        const profileResult = await userProfileRepo.insert(body.profile, trx);

        await trx.commit();

        return res.status(200).json({ userResult, profileResult });
    } catch (error) {
        await trx.rollback();
        throw new ErrorResponse(500, "", error);
    }

}

async function patch(req: Request, res: Response) {
    const userId = req.params.id;
    const body = req.body as UserPatchBody;
    const errors = await validateUpdate(body);

    if (errors)
        throw new ErrorResponse(400, "Validation error", errors);

    const trx = await db.transaction();

    try {
        let userResult: number | null = null;
        let profileResult: number | null = null;


        if (body.credential) {

            if (body.credential.password)
                body.credential.password = await argon2.hash(body.credential.password);

            userResult = await userRepo.update(userId, body.credential);
        }
        if (body.profile) {
            const matchedProfile = await userProfileRepo.find({ user_id: parseInt(userId) });

            if (matchedProfile.length > 0)
                profileResult = await userProfileRepo.update(matchedProfile[0].id, body.profile);
        }

        await trx.commit();

        return res.status(200).json({ userResult, profileResult });
    } catch (error) {
        await trx.rollback();
        throw new ErrorResponse(500, "Internal Server Error", error);
    }

}

async function del(req: Request, res: Response) {

}

export {
    count,
    get,
    post,
    patch,
    del,
    bulkImport
};
