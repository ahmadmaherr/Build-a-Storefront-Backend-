"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var path = require('path');
var fs = require('fs');
var products = express_1["default"].Router();
products.get('/products', function (req, res) {
    res.send('Hello World!!!!');
});
products.get('blogs/:id', function (req, res) {
    res.send('Hello World!!!!');
});
products.post('/products', function (req, res) {
    res.send('Hello World!!!!');
});
products.put('/products', function (req, res) {
    res.send('Hello World!!!!');
});
products.patch('/products', function (req, res) {
    res.send('Hello World!!!!');
});
products["delete"]('/products', function (req, res) {
    res.send('Hello World!!!!');
});
exports["default"] = products;
