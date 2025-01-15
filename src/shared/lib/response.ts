import { v4 as uuidv4 } from "uuid";
export class HttpResponse {
    status: number;
    message: string;
    payload: unknown;


    constructor(status: number = 200, message: string = "", payload: unknown) {
        this.status = status;
        this.message = message;
        this.payload = payload;
    }
};

export class ErrorResponse extends Error {
    id: string; // unique id for logging purposes
    status: number;
    message: string;
    payload: unknown;

    constructor(status: number = 400, message: string = "", payload: unknown) {
        super();
        this.id = uuidv4();
        this.status = status;
        this.message = message;
        this.payload = payload;
    }

}