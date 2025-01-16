import { Request, Response } from "express";
import * as UserRoleRepo from "../../../shared/repository/user-role";
import { HttpResponse } from "../../../shared/lib/response";

export async function store(req: Request, res: Response) {
    const body = req.body;
    
    // TODO: dapat naay validation

    const result = await UserRoleRepo.insert(body);
    const response = new HttpResponse(200, "Added successfully", result);
    return res.status(response.status).json(response);
}

export async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await UserRoleRepo.find(query);
    const response = new HttpResponse(200, "", result);

    return res.status(response.status).json(response);
}

export async function updateById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const body = req.body;

    await UserRoleRepo.update(id, body);
    const response = new HttpResponse(200, "Updated successfully", { id });

    return res.status(response.status).json(response);
}

export async function deleteById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    await UserRoleRepo.remove(id);

    const response = new HttpResponse(200, "Deleted successfully", { id });
    return res.status(response.status).json(response);
}
