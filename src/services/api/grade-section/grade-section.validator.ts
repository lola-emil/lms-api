import Joi from "joi";
import GradeSectionRepo from "../../../repositories/grade-section";

export type GradeSectionBody = {
    grade_level_id: number;
    section_name: string;
};

const bodySchema = Joi.object({
    grade_level_id: Joi.number().required(),
    section_name: Joi.string().required()
});


export async function validateGradeSection(body: GradeSectionBody): Promise<Joi.ValidationErrorItem[] | null> {
    const { error } = bodySchema.validate(body, { abortEarly: false });

    if (error)
        return error.details;

    const matchedSection = await GradeSectionRepo.find({
        section_name: body.section_name,
        grade_level_id: body.grade_level_id
    });

    if (matchedSection.length > 0)
        return [
            {
                path: ['section_name'],
                message: `Section name '${body.section_name}' is already taken`,
                type: ""
            }
        ];

    return null;
}