"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createAccessToken = exports.GenerateRefreshToken = exports.GenerateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AccessToken_SecretKey = process.env.AccessToken_SECRETKEY || "access123";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "refresh123";
const refreshTokens = [];
const GenerateAccessToken = (id) => {
    return jsonwebtoken_1.default.sign({ id }, AccessToken_SecretKey, {
        expiresIn: "15m",
        algorithm: 'HS256'
    });
};
exports.GenerateAccessToken = GenerateAccessToken;
const GenerateRefreshToken = (id) => {
    const refreshToken = jsonwebtoken_1.default.sign({ id }, REFRESH_TOKEN_SECRET, {
        expiresIn: '7d'
    });
    refreshTokens.push(refreshToken);
    return refreshToken;
};
exports.GenerateRefreshToken = GenerateRefreshToken;
const createAccessToken = (req, res) => {
    const refreshtoken = req.cookies.refreshToken;
    if (!refreshtoken || refreshTokens.includes(refreshtoken)) {
        return res.status(403).json({ message: "Refresh token is invalid or missing." });
    }
    jsonwebtoken_1.default.verify(refreshtoken, REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Token verification failed." });
        }
        let id;
        if (typeof decoded === 'string') {
            // Handle the case where the decoded token is a string
            id = decoded;
        }
        else if (typeof decoded === 'object' && decoded.id) {
            // Handle the case where the decoded token is an object and has an `id`
            id = decoded.id;
        }
        else {
            return res.status(403).json({ message: "Invalid token structure." });
        }
        const newAccessToken = (0, exports.GenerateAccessToken)(id);
        res.json({ accessToken: newAccessToken });
    });
};
exports.createAccessToken = createAccessToken;
