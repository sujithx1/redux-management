"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const authmiddleware_1 = require("../middleware/authmiddleware");
const UserRouter = express_1.default.Router();
UserRouter.get('/login', userController_1.default.Getlogin);
UserRouter.post('/login', userController_1.default.Setlogin);
UserRouter.post('/signup', userController_1.default.SetSignup);
UserRouter.get('/home', authmiddleware_1.Auth, userController_1.default.GetHome);
UserRouter.put('/edit', userController_1.default.UpdateUser);
UserRouter.delete('/delete', userController_1.default.Deleteuser);
exports.default = UserRouter;
