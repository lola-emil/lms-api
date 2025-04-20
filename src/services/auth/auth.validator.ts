import argon2 from "argon2";
import Joi from "joi";
import userRepo from "../../modules/user-management/users/user.repo";

const bodySchema = Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required()
});

export async function validateSignIn(body: { email: string; password: string; }): Promise<Joi.ValidationErrorItem[] | null> {
    const { error } = bodySchema.validate(body);

    if (error)
        return error.details;

    const [matchedUser] = await userRepo.find({
        email: body.email
    });

    if (!matchedUser)
        return [
            {
                path: [""],
                message: "Email not yet registered",
                type: "",
                context: {
                    label: "email"
                }
            }];

    const passwordMatched = await argon2.verify(matchedUser.password, body.password);

    if (!passwordMatched)
        return [
            {
                path: [""],
                message: "Incorrect Password",
                type: "",
                context: {
                    label: "password"
                }
            }
        ];

    return null;
}