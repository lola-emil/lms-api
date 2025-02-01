import Joi from "joi";
import UserRepo, { User } from "../repositories/user";
import bcrypt from "bcrypt";


const userSchema = Joi.object({});

const signInSchema = Joi.object({
    username: Joi.string().required(),
    password: Joi.string().required()
});


export async function validateSignIn(body: User) {
    const {
        error
    } = signInSchema.validate(body, { abortEarly: false });

    if (error)
        return error;

    const matchedUser = await UserRepo.find({
        username: body.username
    });

    if (matchedUser.length == 0)
        return { message: "Incorrect username" };

    if (!(await bcrypt.compare(body.password, matchedUser[0].password)))
        return { message: "Incorrect password" };


    return null;
}