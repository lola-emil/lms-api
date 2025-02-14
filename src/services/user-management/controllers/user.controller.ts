import { type Request, type Response } from "express";

import { UserRequestBody, validateUser } from "../validators/user.validator";
import { ErrorResponse, HttpResponse } from "../../../shared/utils/response";
import bcrypt from "bcrypt";
import { sendAccountVerificationMail, sendMail } from "../../../config/mailer";
import { MAILER_ADDRESS } from "../../../config/constants";



import UserProfileRepo, { UserProfile } from "../repository/user-profile";
import UserRoleRepo, { UserRole } from "../repository/user-role";
import UserRepo, { User } from "../repository/user";
import UserTempCredentialRepo from "../repository/user-temp-credential";


import passwordGenerator from "../../../shared/utils/password-generator";
import { db } from "../../../config/db";

/**
 * User registration ni siya nga function
 * @param req 
 * @param res 
 * @returns 
 */
export async function insert(req: Request, res: Response) {
    const body = req.body as UserRequestBody;
    const errors = await validateUser(body);

    // validate ang body
    if (errors)
        throw new ErrorResponse(400, "", errors);

    // body.user.password = await bcrypt.hash(body.user.password, 10);

    const userProfileResult = await UserProfileRepo.insert(body.user_profile);

    body.user.profile_id = userProfileResult[0];

    const userResult = await UserRepo.insert(body.user);

    const tempPassword = passwordGenerator(8);
    const date = new Date();

    // add one day para sa expiration
    date.setDate(date.getDate() + 1);

    await UserTempCredentialRepo.insert({
        temp_password: tempPassword,
        expires_at: date,
        user_id: userResult[0]
    });


    // Send ang verfication email
    sendAccountVerificationMail(body.user.email, body.user_profile.fname);

    const response = new HttpResponse(200, "Success", {
        message: `Verficiation email has been sent to ${body.user.email}`
    });

    return res.status(200).json(response);

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
    const body = req.body as UserRequestBody;

    const matchedUser = await UserRepo.find({ id });

    if (matchedUser.length == 0)
        throw new ErrorResponse(400, "", {
            message: "Invalid ID"
        });

}