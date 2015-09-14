function ClientError(code, message) {
    this.code = code;
    this.message = message;
};

ClientError.createInstance = function createInstance(code, message) {
    return new ClientErr(err, message);
};

module.exports = exports = ClientError;