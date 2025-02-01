import { Request, Response } from "express";
import { xlsx_to_csv } from "../../lib/doc_parser/index.node";



export function insert(req: Request, res: Response) {
    xlsx_to_csv("");

    return res.status(200).json({
        message: "halo"
    });
}