"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var errorMiddleware = function (err, req, res, next) {
    var status = err.status || 501;
    var message = err.message || 'something wrong';
    res.status(status).json({ status: status, message: message });
    next();
};
exports.default = errorMiddleware;
