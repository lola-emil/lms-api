
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
    status: number;
    data: any;
    // errorId: string;

    constructor(status: number, message?: string, data?: any) {
        super();

        this.status = status;

        if (this.status >= 500)
            this.message = "Internal Server Error: " + this.message;

        this.message = String(message ?? "");
        this.data = data;
    }
}