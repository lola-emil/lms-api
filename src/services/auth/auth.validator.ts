import Joi, { ValidationErrorItem } from "joi";
import usersRepo from "../api/users/users.repo";
import argon from "argon2";


export type Body = {
    email: string;
    password: string;
};

const authSchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

export async function validateAuth(body: Body): Promise<ValidationErrorItem[] | null> {
    const { error } = authSchema.validate(body);

    if (error)
        return error.details;

    const [matchedUser] = await usersRepo.find({
        email: body.email,
    });

    if (!matchedUser)
        return [
            {
                path: [""],
                message: "Incorrect email or password",
                type: ""
            }
        ];

    if (!(await argon.verify(matchedUser.password, body.password)))
        return [
            {
                path: [""],
                message: "Incorrect email or password",
                type: ""
            }
        ];

    return null;
}