import Joi from "joi";
import { StudentLevel } from "./student-level.repo";



const studentLevelBodySchema = Joi.object({
    grade_level_id: Joi.number().required(),
    grade_section_id: Joi.number().required,
    school_year_id: Joi.number().required(),
});


export async function validateStudentLevel(body: Partial<StudentLevel>): Promise<Joi.ValidationErrorItem[] | null> {
    const { error } = studentLevelBodySchema.validate(body, { abortEarly: false });

    if (error)
        return error.details

    return null;
}