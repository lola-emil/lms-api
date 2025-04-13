import Joi from "joi";
import { SchoolYear } from "./school-year.repo";

const schoolYearBodySchema = Joi.object({
    start_year: Joi.number().required(),
    end_year: Joi.number().required()
});

export async function validateSchoolYear(body: Partial<SchoolYear>): Promise<Joi.ValidationErrorItem[] | null> {
    const { error } = schoolYearBodySchema.validate(body, { abortEarly: false });

    if (error)
        return error.details;

    if (body.start_year! > body.end_year!)
        return [
            {
                path: [""],
                message: "start year should be less",
                type: "",
                context: {
                    label: "school_year"
                }
            }
        ];

    return null;
}