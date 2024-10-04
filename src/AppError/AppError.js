class ServerError {
    statuscode;
    message;

    constructor(message, statuscode = 400) {
        this.statuscode = statuscode;
        this.message = message;
    }
}

module.exports = ServerError;