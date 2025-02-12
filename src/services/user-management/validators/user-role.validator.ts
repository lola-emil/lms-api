import Joi, { ValidationErrorItem } from "joi";
import UserRoleRepo, { UserRole } from "../repository/user-role";



const roleSchema = Joi.object({
    role_name: Joi.string().required()
});

export async function validateUserRole(body: UserRole): Promise<ValidationErrorItem[] | null> {
    const result = roleSchema.validate(body, {abortEarly: false});

    if (result.error)
        return result.error.details;

    // Make sure nga dili magka balik2 ang mga pangalan
    const matchedRole = await UserRoleRepo.find({role_name: body.role_name}); 

    if (matchedRole.length > 0)
        return [
            {
                message: "Role already exist",
                path: ["role_name"],
                type: "",
                context: {
                    label: "role_name",
                    "key": "role_name"
                }
            }
        ]
    return null;
}