"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userModel_1 = __importDefault(require("../models/userModel"));
const sequirePassword_1 = require("../helpers/sequirePassword");
const jwt_token_auth_1 = require("../JWT/jwt_token_auth");
class UserController {
    constructor() {
        this.Getlogin = (0, express_async_handler_1.default)(async (req, res) => {
            res.status(200).send("LOADING....");
        });
        this.Setlogin = (0, express_async_handler_1.default)(async (req, res) => {
            const { email, password } = req.body;
            if (!email || !password) {
                res.status(400).json({ message: "please add the email and password" });
                return;
            }
            const userData = await userModel_1.default.findOne({ email: email });
            if (!userData || !userData.password) {
                res.status(400).json({ message: "email not registerd" });
                return;
            }
            if (userData.Delete) {
                res.status(400).json({ message: 'User Is Blocked' });
                return;
            }
            const isMatch = await (0, sequirePassword_1.comparePass)(password, userData.password);
            if (!isMatch) {
                res.status(400).json({ message: "password  not matched" });
                return;
            }
            res.status(200).json({
                message: "Login Success...",
                image: userData.image,
                mobile: userData.mobile,
                id: userData.id,
                username: userData.username,
                email: userData.email,
                token: (0, jwt_token_auth_1.Generatetoken)(userData.id),
                profilepic: userData.image,
                Delete: userData.Delete
            });
            return;
        });
        this.SetSignup = (0, express_async_handler_1.default)(async (req, res) => {
            const { username, email, mobile, password } = req.body;
            if (!username || !email || !mobile || !password) {
                res.status(400).json({ message: "please eneter field" });
                return;
            }
            console.log(typeof password);
            const Existuser = await userModel_1.default.findOne({ email: email });
            if (Existuser) {
                res.status(400).json({ message: "Email Already Register" });
                return;
            }
            const hashedpassword = await (0, sequirePassword_1.HashPassword)(password);
            console.log(hashedpassword);
            const insertUser = new userModel_1.default({
                username,
                email,
                mobile,
                password: hashedpassword,
            });
            await insertUser.save();
            const token = (0, jwt_token_auth_1.Generatetoken)(insertUser.id);
            res.status(201).json({
                message: "signUp success",
                _id: insertUser.id,
                username: insertUser.username,
                email: insertUser.email,
                mobile: insertUser.mobile,
                Delete: insertUser.Delete,
                token: token,
            });
        });
        this.GetHome = (0, express_async_handler_1.default)(async (req, res) => {
            const userid = req.user?.id;
            console.log("home page");
            if (!userid) {
                console.log(",fmdmn");
            }
            const userData = await userModel_1.default.findById(userid);
            res.status(200).json({ message: "Home page",
                id: userData?._id,
                username: userData?.username,
                email: userData?.email,
                mobile: userData?.mobile });
        });
        this.GetUpdateUser = (0, express_async_handler_1.default)(async (req, res) => {
            const { id } = req.body;
            const user = await userModel_1.default.findById(id);
            if (!user) {
                res.status(400).json({ message: "Invalid user " });
                return;
            }
            res.status(200).json({ message: "User finded", data: user });
        });
        // UpdateUser = asyncHandler(
        //   async (req: express.Request, res: express.Response) => {
        //     let { id } = req.query;
        //     const { username, mobile, email } = req.body;
        //     // id = id.trim();
        //     if (!id) {
        //       res.status(400).json({ message: "Id not defined" });
        //       return;
        //     }
        //     console.log(id);
        //     id = id.toString().trim();
        //     if (!username || !mobile || !email) {
        //       res.status(400).json({ message: "please enter something" });
        //       return;
        //     }
        //     const user = await User.findByIdAndUpdate(
        //       id,
        //       {
        //         username,
        //         email,
        //         mobile,
        //       },
        //       {
        //         new: true,
        //         runValidators: true,
        //       }
        //     );
        //     if (!user) {
        //       res
        //         .status(400)
        //         .json({ message: "User not found Updated something problem" });
        //       return;
        //     }
        //     await user?.save();
        //     res.status(200).json({ message: "Update User Success" });
        //   }
        // );
        this.Deleteuser = (0, express_async_handler_1.default)(async (req, res) => {
            const { id } = req.body;
            if (!id) {
                res.status(400).json({ message: "Somthing problem" });
                return;
            }
            const user = await userModel_1.default.findByIdAndUpdate(id, { Delete: true });
            if (!user) {
                res.status(400).json({ message: "user not Found" });
                return;
            }
            await user?.save();
            res.status(200).json({ message: "delete User is Success", data: user });
        });
        this.userLogout = (0, express_async_handler_1.default)(async (req, res) => {
            res.status(200).json({ message: 'Logout success...' });
        });
        this.UpdateUser = (0, express_async_handler_1.default)(async (req, res) => {
            console.log("upload user rendering...");
            const { id, email, username, mobile, token } = req.body;
            console.log(id, email, username, mobile, token);
            const profilePic = req.file ? req.file.filename : null;
            console.log("profile", profilePic);
            if (!id) {
                console.log("ivalid id ");
                res.status(400).json({ message: 'invalid user' });
                return;
            }
            if (!email || !username || !mobile) {
                console.log("no email ... no username... no mobile..");
                res.status(400).json({ message: 'Enter something' });
                return;
            }
            const userData = await userModel_1.default.findOne({ _id: id });
            if (!userData) {
                console.log("user not Found...");
                res.status(400).json({ message: 'User Not Found' });
                return;
            }
            userData.username = username;
            userData.email = email;
            userData.mobile = mobile;
            if (profilePic) {
                userData.image = profilePic;
            }
            userData.save();
            res.status(200).json({ message: 'update userSuccess', user: userData,
                profilePicUrl: `http://localhost:3001/uploads/${profilePic}`,
                id: userData.id,
                username: userData.username,
                image: userData.image,
                email: userData.email,
                mobile: userData.mobile,
                token: token,
                Delete: userData.Delete
            });
        });
    }
}
exports.default = new UserController();
