import { type Request, type Response } from "express";
import UserProfileRepo, { UserProfile } from "../repository/user-profile";
import UserRoleRepo, { UserRole } from "../repository/user-role";
import UserRepo, { User } from "../repository/user";
import { UserRequestBody, validateUser } from "../validators/user.validator";
import { ErrorResponse } from "../../../shared/utils/response";
import bcrypt from "bcrypt";
import { sendMail } from "../../../config/mailer";
import { MAILER_ADDRESS } from "../../../config/constants";

import fs from "fs";
import path from "path";
import Handlebars from "handlebars";

export async function insert(req: Request, res: Response) {
    const body = req.body as UserRequestBody;
    const errors = await validateUser(body);


    if (errors)
        throw new ErrorResponse(400, "", errors);

    body.user.password = await bcrypt.hash(body.user.password, 10);

    const profileResult  = await UserProfileRepo.insert(body.user_profile);

    body.user.profile_id = profileResult[0];
    const userResult = await UserRepo.insert(body.user);

    const templateSource = fs.readFileSync(path.join(__dirname, "../../../../assets/mail_templates/account-verification.hbs")).toString();
    const mailTemplate = Handlebars.compile(templateSource);

    const template = mailTemplate({
        name: body.user_profile.fname,
        verification_link: "http://localhost:8000/verify-account"
    });

    console.log(template);

    sendMail(MAILER_ADDRESS, body.user.email, {
        html: template,
        subject: "Account Verification"
    });

    return res.status(200).json(userResult);
}

export async function find(req: Request, res: Response) {
    const query = req.query;

    const result = await UserRepo.find(query);

    return res.status(200).json(result);
}

export async function update(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const body = req.body as UserRequestBody;

    const matchedUser = await UserRepo.find({ id });

    if (matchedUser.length == 0)
        throw new ErrorResponse(400, "", {
            message: "Invalid ID"
        });

}