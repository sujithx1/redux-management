"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const sequirePassword_1 = require("../helpers/sequirePassword");
const adminModel_1 = __importDefault(require("../models/adminModel"));
const jwt_token_auth_1 = require("../JWT/jwt_token_auth");
const userModel_1 = __importDefault(require("../models/userModel"));
class AdminController {
    constructor() {
        this.adminlogin = (0, express_async_handler_1.default)(async (req, res) => {
            console.log("admin login rendering...");
            const { username, password } = req.body;
            console.log(username, password);
            if (!username || !password) {
                res.status(400).json({ message: 'required all field' });
                return;
            }
            const adminData = await adminModel_1.default.findOne({ username: username });
            if (!adminData || !adminData.password) {
                res.status(400).json({ message: "username not registerd" });
                return;
            }
            const isMatch = await (0, sequirePassword_1.comparePass)(password, adminData.password);
            if (!isMatch) {
                res.status(400).json({ message: "password  not matched" });
                return;
            }
            // const hashPassword=await HashPassword(password)
            // const adminData=new Admin({
            //     username,
            //     password:hashPassword
            // })
            //  await adminData.save()
            //  const token=Generatetoken(adminData.id)
            res.status(201).json({
                message: 'login Success',
                id: adminData.id,
                username: adminData.username,
                token: (0, jwt_token_auth_1.Generatetoken)(adminData.id)
            });
        });
        this.getallUsers = (0, express_async_handler_1.default)(async (req, res) => {
            const users = await userModel_1.default.find();
            res.status(200).json({ message: 'success fetch all users', users: users });
        });
        this.setUserBlock = (0, express_async_handler_1.default)(async (req, res) => {
            console.log("block user rendering...");
            const { userId } = req.body;
            console.log("user ID", userId);
            if (!userId) {
                res.status(400).json({ message: 'invalid Id' });
                return;
            }
            const userData = await userModel_1.default.findByIdAndUpdate(userId, { $set: { Delete: true } }, { new: true });
            if (userData) {
                res.status(200).json({ message: 'user Blocked Success', userId: userData._id });
                return;
            }
            res.status(400).json({ message: 'user Not Blocked' });
        });
        this.setUserUnBlock = (0, express_async_handler_1.default)(async (req, res) => {
            const { userId } = req.body;
            if (!userId) {
                res.status(400).json({ message: 'invalid userId' });
                return;
            }
            const userData = await userModel_1.default.findByIdAndUpdate(userId, {
                Delete: false
            }, { new: true });
            if (!userData) {
                res.status(400).json({ mesaage: 'not unblocked' });
                return;
            }
            res.status(200).json({ message: 'Unblock success', userId: userData._id });
            return;
        });
        this.getEditUser = (0, express_async_handler_1.default)(async (req, res) => {
            console.log("get edit user");
            const { userId } = req.params;
            if (!userId) {
                console.log("not gettin user id ");
                res.status(400).json({ message: 'invalid id' });
                return;
            }
            const userData = await userModel_1.default.findById(userId);
            if (!userData) {
                console.log("not user found ");
                res.status(400).json({ message: 'user not found' });
                return;
            }
            console.log("user found success");
            res.status(200).json({ message: 'get edit user success', user: userData });
            return;
        });
        this.setEditUser = (0, express_async_handler_1.default)(async (req, res) => {
            console.log("setedit user renderingg");
            const { username, mobile, email, _id } = req.body;
            console.log("user from edit", username, mobile, email, _id);
            if (!username || !mobile || !email || !_id) {
                res.status(400).json({ message: 'invalid Data' });
                return;
            }
            const userData = await userModel_1.default.findByIdAndUpdate(_id, {
                $set: { username: username,
                    email: email,
                    mobile: mobile
                }
            }, { new: true });
            if (!userData) {
                res.status(400).json({ message: 'user Not Updated' });
                return;
            }
            res.status(200).json({ message: 'user Update success', userData });
        });
        // getallUsers=AsyncHandler(async (req:Request,res:Response) => {
        // })
    }
}
exports.default = new AdminController();
