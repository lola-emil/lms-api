import Joi from "joi";
import userRepo, { User } from "../repository/user";



const userBodySchema = Joi.object({
    email: Joi.string().email().required(),
    // password: Joi.string()
    //     .min(8)
    //     .max(50)
    //     .pattern(/[a-z]/, "lowercase")
    //     .pattern(/[A-Z]/, "uppercase")
    //     .pattern(/[0-9]/, "number")
    //     .pattern(/[@$!%*?&]/, "special character")
    //     .required()
    //     .messages({
    //         "string.min": "Password must be at least 8 characters long.",
    //         "string.max": "Password cannot exceed 50 characters.",
    //         "string.pattern.name": "Password must contain at least one {#name}.",
    //         "any.required": "Password is required."
    //     }),
    role_id: Joi.number().required(),

    fname: Joi.string().required(),
    mname: Joi.string(),
    lname: Joi.string().required(),
    id_no: Joi.string().required(),
    dob: Joi.date().required()
});

export async function validateUser(body: User): Promise<Joi.ValidationErrorItem[] | null> {
    const result = userBodySchema.validate(body, { abortEarly: false });

    if (result.error)
        return result.error.details;

    const matchedUser = await userRepo.find({ email: body.email });

    if (matchedUser.length > 0)
        return [
            {
                message: "Email already taken",
                path: [
                    "email"
                ],
                type: "",
                context: {
                    label: "email",
                    key: "email"
                }
            }
        ];

    return null;
}