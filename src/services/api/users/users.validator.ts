import Joi, { ValidationErrorItem } from "joi";
import usersRepo from "./users.repo";

type Body = {
    firstname: string;
    middlename?: string;
    lastname: string;

    email: string;
    password: string;
};

const bodySchema = Joi.object({});


export async function validateUser(body: Body): Promise<ValidationErrorItem[] | null> {
    const { error } = bodySchema.validate(body, { abortEarly: false });

    if (error)
        return error.details;

    const matchedUser = await usersRepo.find({
        email: body.email
    });

    if (matchedUser.length > 0)
        return [
            {
                path: [""],
                message: "Email already taken",
                type: "",
            }
        ];

    return null;
}