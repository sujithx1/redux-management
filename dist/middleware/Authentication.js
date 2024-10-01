"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userauth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let jwt_secret = process.env.JWT_SECRETKEY || "sujith123";
const userauth = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        const verifyToken = jsonwebtoken_1.default.verify(token, jwt_secret);
        if (!verifyToken)
            return res.status(401).json({ message: 'Unauthorized' });
        console.log("verify token id", verifyToken.id);
        req.userId = verifyToken.id;
        next();
    }
    else {
        return res.status(401).json({ message: "authorization denied" });
    }
};
exports.userauth = userauth;
