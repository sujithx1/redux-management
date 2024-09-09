"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Generatetoken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwt_secret = process.env.JWT_SECRETKEY || "sujith123";
const Generatetoken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, jwt_secret, {
        expiresIn: "10d",
        algorithm: 'HS256'
    });
};
exports.Generatetoken = Generatetoken;
