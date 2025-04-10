import type { Request, Response } from "express";


async function get(req: Request, res: Response) { }
async function post(req: Request, res: Response) { }
async function patch(req: Request, res: Response) { }
async function del(req: Request, res: Response) { }

export {
    get,
    post,
    patch,
    del
};
