"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminController_1 = __importDefault(require("../controllers/adminController"));
const AdminRoute = express_1.default.Router();
AdminRoute.post('/login', adminController_1.default.adminlogin);
AdminRoute.get('/users', adminController_1.default.getallUsers);
AdminRoute.put('/block', adminController_1.default.setUserBlock);
AdminRoute.put('/unblock', adminController_1.default.setUserUnBlock);
AdminRoute.get('/edit/:userId', adminController_1.default.getEditUser);
AdminRoute.put('/update', adminController_1.default.setEditUser);
AdminRoute.post('/newuser', adminController_1.default.CreateNewUSer);
exports.default = AdminRoute;
