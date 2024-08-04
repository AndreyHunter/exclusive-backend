export class HttpError extends Error {
    constructor(statusCode, message) {
        super(message);
        this.statusCode = statusCode;
        this.name = 'HttpError';
    }
}

export class DbError extends HttpError {
    constructor(statusCode, message) {
        super(statusCode, message);
        this.name = 'DbError';
    }
}
