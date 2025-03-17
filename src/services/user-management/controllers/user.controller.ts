import { type Request, type Response } from "express";

import { validateUser } from "../validators/user.validator";
import { ErrorResponse, ApiResponse } from "../../../shared/utils/response";
import bcrypt from "bcrypt";
import { sendAccountVerificationMail, sendMail } from "../../../config/mailer";



import UserRoleRepo, { UserRole } from "../repository/user-role";
import UserRepo, { User } from "../repository/user";


import passwordGenerator from "../../../shared/utils/password-generator";
import { db } from "../../../config/db";

/**
 * User registration ni siya nga function
 * @param req 
 * @param res 
 * @returns 
 */
export async function insert(req: Request, res: Response) {

}


/**
 * Finds ra gud ug record sa database
 * @param req 
 * @param res 
 * @returns 
 */
export async function find(req: Request, res: Response) {
    const query = req.query;

    const result = await UserRepo.find(query);

    return res.status(200).json(result);
}

/**
 * Para update sa profile sa user
 * @param req 
 * @param res 
 */
export async function update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const body = req.body as User;

    const matchedUser = await UserRepo.find({ id });

    if (matchedUser.length == 0)
        throw new ErrorResponse(400, "", {
            message: "Invalid ID"
        });

}