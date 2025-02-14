
export class HttpResponse {
    status: number;
    message: string;
    data: unknown;


    constructor(status: number = 200, message: string = "", data: unknown) {
        this.status = status;
        this.message = message;
        this.data = data;
    }
};

export class ErrorResponse extends Error {
    status: number;
    data: unknown;
    // errorId: string;

    constructor(status: number, message?: string, data?: unknown) {
        super();

        this.status = status;

        if (this.status >= 500)
            this.message = "Internal Server Error: " + this.message;

        this.message = String(message ?? "");
        this.data = data;
    }
}