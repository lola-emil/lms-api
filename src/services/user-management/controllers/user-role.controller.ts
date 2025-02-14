import { type Request, type Response } from "express";
import UserRoleRepo, { UserRole } from "../repository/user-role";
import { validateUserRole } from "../validators/user-role.validator";
import { ErrorResponse, HttpResponse } from "../../../shared/utils/response";


export async function insert(req: Request, res: Response) {
    const body = req.body as UserRole;
    const errors = await validateUserRole(body);

    if (errors)
        throw new ErrorResponse(400, "", errors);

    const result = await UserRoleRepo.insert(body);

    const response = new HttpResponse(200, "", result);

    return res.status(200).json(response);
}

export async function find(req: Request, res: Response) {
    const query = req.query;

    const result = await UserRoleRepo.find(query);
    const response = new HttpResponse(200, "", result);

    return res.status(200).json(response);
}

export async function update(req: Request, res: Response) {
    const body = req.body;
    const id = parseInt(req.params.id);

    const matchedRole = await UserRoleRepo.find({ id });

    if (matchedRole.length == 0)
        throw new ErrorResponse(400, "", [
            {
                message: "Role already exist",
                path: ["role_name"],
                type: "",
                context: {
                    label: "role_name",
                    "key": "role_name"
                }
            }
        ]);

    const result = await UserRoleRepo.update(id, body);
    const response = new HttpResponse(200, "", result);
    
    return res.status(200).json(response);
}

export async function remove(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    const result = await UserRoleRepo.remove(id);

    return res.status(200).json(result);
}   