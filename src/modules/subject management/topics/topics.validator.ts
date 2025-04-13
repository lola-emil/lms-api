import Joi, { ValidationErrorItem } from "joi";
import { Topic } from "./topics.repo";
import { Lesson } from "../lessons/lesson.repo";


export type TopicBody = {
    topic: Topic,
    lessons?: Lesson[];
};

const topicBodySchema = Joi.object({
    topic: Joi.object({}),
    lessons: Joi.array().items(Joi.object({
        title: Joi.string(),
        description: Joi.string().optional().empty(),
    })).not().required()
});

export async function validateTopic(body: TopicBody): Promise<ValidationErrorItem[] | null> {
    const { error } = topicBodySchema.validate(body, { abortEarly: false });

    if (error)
        return error.details;

    return null;
}