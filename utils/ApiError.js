class ApiError extends Error {
    constructor(message, statusCode){
        super(message);
        this.message = message;
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith(4) ? "Failed": "Error";
        this.isOperational = true;
    }
}

module.exports = ApiError;