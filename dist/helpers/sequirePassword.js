"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePass = exports.HashPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const HashPassword = async (password) => {
    const saltRound = 10;
    const salt = await bcrypt_1.default.genSalt(saltRound);
    const hashedpassword = await bcrypt_1.default.hash(password, salt);
    return hashedpassword;
};
exports.HashPassword = HashPassword;
const comparePass = async (enterdpassword, password) => {
    const isMatch = await bcrypt_1.default.compare(enterdpassword, password);
    return isMatch;
};
exports.comparePass = comparePass;
