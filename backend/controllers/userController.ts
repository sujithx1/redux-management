import express from "express";
import asyncHandler from "express-async-handler";
import User, { TypeUser } from "../models/userModel";
import bcrypt from "bcrypt";
import { comparePass, HashPassword } from "../helpers/sequirePassword";
import { Generatetoken } from "../JWT/jwt_token_auth";

class UserController {
  Getlogin = asyncHandler(
    async (req: express.Request, res: express.Response) => {
      res.status(200).send("LOADING....");
    }
  );

  Setlogin = asyncHandler(
    async (req: express.Request, res: express.Response) => {
      const { email, password } = req.body;
      if (!email || !password) {
        res.status(400).json({ message: "please add the email and password" });
        return;
      }

      const userData = await User.findOne({ email: email });

      if (!userData || !userData.password) {
        res.status(400).json({ message: "email not registerd" });
        return;
      }
      const isMatch = await comparePass(password, userData.password);
      if (!isMatch) {
        res.status(400).json({ message: "password  not matched" });
        return;
      }

      res.status(200).json({
        message: "Login Success...",
        _id: userData.id,
        username: userData.username,
        email: userData.email,
        token: Generatetoken(userData.id),
      });
      return;
    }
  );

  SetSignup = asyncHandler(
    async (req: express.Request, res: express.Response) => {
      const { username, email, mobile, password } = req.body;

      if (!username || !email || !mobile || !password) {
        res.status(400).json({ message: "please eneter field" });
        return;
      }
      console.log(typeof password);

      const Existuser = await User.findOne({ email: email });
      if (Existuser) {
        res.status(400).json({ message: "Email Already Register" });
        return;
      }

      const hashedpassword = await HashPassword(password);
      console.log(hashedpassword);

      const insertUser = new User({
        username,
        email,
        mobile,
        password: hashedpassword,
      });
      await insertUser.save();

      const token = Generatetoken(insertUser.id);

      res.status(201).json({
        message: "signUp success",

        _id: insertUser.id,
        username: insertUser.username,
        email: insertUser.email,

        token: token,
      });
    }
  );

  GetHome = asyncHandler(
    async (req: express.Request, res: express.Response) => {
      const userid=req.user?.id
      if(!userid)
      {
        console.log(",fmdmn");
        
      }
      const userData=await User.findById(userid)

      res.status(200).json({ message: "Home page" ,
        id:userData?._id,
      username:userData?.username,
    email:userData?.email,
  mobile:userData?.mobile});
    }
  );

  GetUpdateUser = asyncHandler(
    async (req: express.Request, res: express.Response) => {
      const { id } = req.body;
      const user = await User.findById(id);
      if (!user) {
        res.status(400).json({ message: "Invalid user " });
        return;
      }
      res.status(200).json({ message: "User finded", data: user });
    }
  );

  UpdateUser = asyncHandler(
    async (req: express.Request, res: express.Response) => {
      let { id } = req.query;

      const { username, mobile, email } = req.body;
      // id = id.trim();

      if (!id) {
        res.status(400).json({ message: "Id not defined" });
        return;
      }
      console.log(id);
      id = id.toString().trim();

      if (!username || !mobile || !email) {
        res.status(400).json({ message: "please enter something" });
        return;
      }
      const user = await User.findByIdAndUpdate(
        id,
        {
          username,
          email,
          mobile,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      if (!user) {
        res
          .status(400)
          .json({ message: "User not found Updated something problem" });
        return;
      }
      await user?.save();
      res.status(200).json({ message: "Update User Success" });
    }
  );

  Deleteuser = asyncHandler(
    async (req: express.Request, res: express.Response) => {
      const { id } = req.body;
      if (!id) {
        res.status(400).json({ message: "Somthing problem" });
        return;
      }
      const user = await User.findByIdAndUpdate(id, { Delete: true });
      if (!user) {
        res.status(400).json({ message: "user not Found" });
        return;
      }
      await user?.save();
      res.status(200).json({ message: "delete User is Success", data: user });
    }
  );
  //  Deleteuser=asyncHandler(async (req:express.Request,res:express.Response) => {

  //  })
}

export default new UserController();
