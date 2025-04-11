import Joi from "joi";
import gradeSectionsRepo, { GradeSection } from "./grade-sections.repo";


const gradeSectionPostSchema = Joi.object({
    grade_level_id: Joi.number().required(),
    section_name: Joi.string().required()
});

const gradeSectionPatchSchema = Joi.object({
    grade_level_id: Joi.number(),
    section_name: Joi.string()
});

export async function validatePost(body: Partial<GradeSection>): Promise<Joi.ValidationErrorItem[] | null> {
    const { error } = gradeSectionPostSchema.validate(body, { abortEarly: false });

    if (error)
        return error.details;

    const matchedSection = await gradeSectionsRepo.find({
        grade_level_id: body.grade_level_id,
        section_name: body.section_name
    });

    if (matchedSection.length > 0)
        return [
            {
                path: [""],
                message: "Section name already exist.",
                type: ""
            }
        ];

    return null;
}

export async function validatePatch(body: Partial<GradeSection>) {
    const { error } = gradeSectionPatchSchema.validate(body, { abortEarly: false });

    if (error)
        return error.details;

    return null;
}