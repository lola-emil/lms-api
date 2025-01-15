import { Request, Response } from "express";
import * as UserRepo from "../../../shared/repository/user";
import { HttpResponse } from "../../../shared/lib/response";

export async function store(req: Request, res: Response) {
    const body = req.body;
    
    // TODO: dapat naay validation

    const result = await UserRepo.insert(body);
    const response = new HttpResponse(200, "Added successfully", result);
    return res.status(response.status).json(response);
}

export async function get(req: Request, res: Response) {
    const query = req.query;
    const result = await UserRepo.find(query);
    const response = new HttpResponse(200, "", result);

    return res.status(response.status).json(response);
}

export async function updateById(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    const body = req.body;

    await UserRepo.update(id, body);
    const response = new HttpResponse(200, "Updated successfully", { id });

    return res.status(response.status).json(response);
}

export async function deleteById(req: Request, res: Response) {
    const id = parseInt(req.params.id);

    await UserRepo.remove(id);

    const response = new HttpResponse(200, "Deleted successfully", { id });
    return res.status(response.status).json(response);
}