import Joi from "joi";
import userRepo, { User } from "./user.repo";
import { UserProfile } from "../user-profiles/user-profile.repo";

export type UserPostBody = {
    credential: User,
    profile: UserProfile;
};
export type UserPatchBody = Partial<UserPostBody>;


const postSchema = Joi.object({
    credential: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string(),
        user_role_id: Joi.number().required()
    }).required(),
    profile: Joi.object({
        fname: Joi.string().max(255).required(),
        mname: Joi.string().max(255).empty().optional(),
        lname: Joi.string().max(255).required(),

        home_address: Joi.string().optional(),
        contact_no: Joi.string().optional()
    }).optional()
});

const patchSchema = Joi.object({
    credential: Joi.object({
        email: Joi.string().email().max(255),
        password: Joi.string(),
        role_id: Joi.number()
    }),
    profile: Joi.object({
        fname: Joi.string().max(255),
        mname: Joi.string().max(255),
        lname: Joi.string().max(255),

        home_address: Joi.string().optional(),
        contact_no: Joi.string().optional()
    }).optional()
});

export async function validatePost(body: UserPostBody): Promise<Joi.ValidationErrorItem[] | null> {
    const { error } = postSchema.validate(body, { abortEarly: false });

    // check if schema is valid
    if (error)
        return error.details;

    const matchedUser = await userRepo.find({email: body.credential.email});
    if (matchedUser.length > 0)
        return [
            {
                path: [""],
                message: "Email already taken",
                type: "",
                context: {
                    label: "credential.email"
                }
            }
        ];

    return null;
}


export async function validateUpdate(body: UserPatchBody): Promise<Joi.ValidationErrorItem[] | null> {
    const { error } = patchSchema.validate(body, { abortEarly: false });

    if (error)
        return error.details;

    if (body.credential?.email) {
        const matchedUser = await userRepo.find({ email: body.credential.email });
        
        if (matchedUser.length > 0)
            return [
                {
                    path: [""],
                    message: "Email already taken",
                    type: "",
                    context: {
                        label: "credential.email"
                    }
                }
            ];
    }

    return null;
}