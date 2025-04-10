import UserRepo from "../../../repositories/user";
import Joi from "joi";
import { ErrorResponse } from "../../../utils/response";

export type EnrolledSubjectField = {
    subject_id: number;
    grade_level_id: number;
    grade_section_id: number;
};

export type StudentInfoField = {
    student_no?: string;
    grade_level_id: number;
    grade_section_id: number;
};

export type UserBody = {
    firstname: string;
    middlename?: string;
    lastname: string;
    address?: string;
    email: string;
    password: string;

    role: "teacher" | "student" | "admin";

    enrolled_subjects?: EnrolledSubjectField[];
    student_info?: StudentInfoField;
};

export const bodySchema = Joi.object({
    firstname: Joi.string().required(),
    middlename: Joi.optional(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string(),

    address: Joi.string().optional(),

    role: Joi.string().valid('teacher', 'student', 'admin').required(),
    // if teacher
    enrolled_subjects: Joi.array().items(Joi.object({
        subject_id: Joi.number().required(),
        grade_level_id: Joi.number().required(),
        grade_section_id: Joi.number().required()
    })).optional(),

    // if student
    student_info:
        Joi.object({
            student_no: Joi.string().allow('').optional(),
            grade_level_id: Joi.number().required(),
            grade_section_id: Joi.number().required()
        }).optional()
});

export async function validateUser(body: UserBody): Promise<Joi.ValidationErrorItem[] | null> {
    const { error } = bodySchema.validate(body, { abortEarly: false });

    if (error)
        return error.details;

    // Check if ang email is already taken
    const matchedUser = await UserRepo.find({ email: body.email });

    if (matchedUser.length > 0)
        return [
            {
                message: "Email already taken",
                path: [],
                type: ""
            }
        ];

    return null;
}