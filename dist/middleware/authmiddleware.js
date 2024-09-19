"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
let jwt_secret = process.env.JWT_SECRETKEY || "sujith123";
exports.Auth = (0, express_async_handler_1.default)(async (req, res, next) => {
    console.log("Auth calling");
    let token = req.header('Authorization')?.replace('Bearer ', '').trim();
    if (!token) {
        res.status(401).json({ error: 'Access denied' });
        return;
    }
    console.log(token.replace(/^"|"$/g, ''));
    token = token.replace(/^"|"$/g, ''); // this is not complicate its just removing "(this one)
    try {
        const decoded = jsonwebtoken_1.default.verify(token, jwt_secret);
        if (typeof decoded === 'object' && 'id' in decoded) {
            req.user = await userModel_1.default.findById(decoded.id).select('-password');
            next();
        }
        else {
            throw new Error('Token does not contain an id');
        }
    }
    catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
});
