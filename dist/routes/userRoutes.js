"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("../controllers/userController"));
const authmiddleware_1 = require("../middleware/authmiddleware");
const multer_1 = require("../helpers/multer");
// import { userauth } from '../middleware/Authentication';
const UserRouter = express_1.default.Router();
// UserRouter.get('/login',UserController.Getlogin)
UserRouter.post('/login', userController_1.default.Setlogin);
UserRouter.post('/register', userController_1.default.SetSignup);
UserRouter.get('/home', userController_1.default.GetHome);
UserRouter.delete('/delete', userController_1.default.Deleteuser);
UserRouter.post('/logout', userController_1.default.userLogout);
UserRouter.put('/updateUser', authmiddleware_1.Auth, multer_1.upload.single('image'), userController_1.default.UpdateUser);
exports.default = UserRouter;
