"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
let jwt_secret = process.env.AccessToken_SECRETKEY || "access123";
exports.Auth = (0, express_async_handler_1.default)(async (req, res, next) => {
    console.log("Auth calling");
    let token = req.header('Authorization')?.replace('Bearer ', '').trim();
    if (!token) {
        console.log("no tokeennnnn");
        res.status(401).json({ error: 'Access denied' });
        return;
    }
    console.log(token);
    try {
        console.log(token.replace(/^"|"$/g, ''));
        // token = token.replace(/^"|"$/g, '');// this is not complicate its just removing "(this one)
        const decoded = jsonwebtoken_1.default.verify(token, jwt_secret);
        console.log("decoded .. ", decoded);
        if (typeof decoded === 'object' && 'id' in decoded) {
            console.log("decodedd///..........");
            const user = await userModel_1.default.findById(decoded.id).select('-password');
            if (!user) {
                console.log("no user... ");
                res.status(401).json({ error: 'User not found.' });
                return;
            }
            if (user.Delete) {
                console.log("user is blocked...");
                res.status(403).json({ error: 'User is blocked by admin.' });
                return;
            }
            req.user = user;
            next();
        }
        else {
            console.log("no decode....");
            throw new Error('Token does not contain an id');
        }
    }
    catch (error) {
        console.log("invalid token");
        res.status(401).json({ error: 'Invalid token' });
    }
});
