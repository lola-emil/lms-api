import Joi, { ValidationErrorItem } from "joi";
import subjectRepo, { Subject } from "./subject.repo";
import { Topic } from "../topics/topics.repo";

export type SubjectBody = {
    subject: Partial<Subject>,
    topics?: Partial<Topic[]>;
};

const subjectPostBodySchema = Joi.object({
    subject: Joi.object({
        subject_name: Joi.string().max(255).required(),
        description: Joi.string().optional(),
        grade_level_id: Joi.number().required()
    }).required(),
    topics: Joi.array().items(Joi.object({
        title: Joi.string(),
        description: Joi.string(),
    }))
});

export async function validatePost(body: SubjectBody): Promise<ValidationErrorItem[] | null> {
    const { error } = subjectPostBodySchema.validate(body);

    if (error)
        return error.details;

    const matchecSubject = await subjectRepo.find({
        subject_name: body.subject.subject_name,
        grade_level_id: body.subject.grade_level_id
    });

    if (matchecSubject.length > 0)
        return [
            {
                path: [""],
                message: "Subject already exists.",
                type: ""
            }
        ];

    return null;
}

export async function validatePatch() { }