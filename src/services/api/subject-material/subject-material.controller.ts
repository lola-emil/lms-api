import { Request, Response } from "express";
import { ErrorResponse } from "../../../utils/response";
import subjectMaterialRepo from "./subject-material.repo";
import { HOSTNAME, PORT } from "../../../config/constants";
import path from "path";

async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await subjectMaterialRepo.find(query);

    return res.status(200).json(result);
}

async function post(req: Request, res: Response) {
    const body = req.body as {
        title: string;
        subject_id: number;
        created_by: number;
    };

    console.log("body", body);

    if (!req.file)
        throw new ErrorResponse(400, "", {});

    console.log(req.file);

    await subjectMaterialRepo.insert({
        title: body.title,
        subject_id: body.subject_id,
        created_by: body.created_by,
        type: "document",
        file_url: `http://${HOSTNAME}:${PORT}/static/${req.file.filename}`
    });

    return res.status(200).json({
        message: "Upload successful"
    });
}

async function patch(req: Request, res: Response) { }

async function del(req: Request, res: Response) { }


export {
    get,
    post,
    patch,
    del
};