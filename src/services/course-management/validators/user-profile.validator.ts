import Joi from "joi";
import { UserProfile } from "../../user-management/repository/user-profile";


const updateProfileSchema = Joi.object({
    fname: Joi.string(),
    mname: Joi.string(),
    lname: Joi.string(),

    dob: Joi.date()
});

export async function validateProfileUpdate(body: UserProfile): Promise<Joi.ValidationErrorItem[] | null> {
    const result = updateProfileSchema.validate(body);

    if (result.error)
        return result.error.details;

    return null;
}