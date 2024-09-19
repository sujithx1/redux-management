import AsyncHandler from "express-async-handler"
import { Request,Response } from "express"
import { comparePass, HashPassword } from "../helpers/sequirePassword"
import Admin from "../models/adminModel"
import { Generatetoken } from "../JWT/jwt_token_auth"
import User from "../models/userModel"

class AdminController{
    adminlogin=AsyncHandler(async (req:Request,res:Response) => {
        console.log("admin login rendering...");
        
        const {username,password}=req.body
        console.log(username,password);
        

        if (!username || !password) {
            res.status(400).json({message:'required all field'})
            return
        }
        const adminData = await Admin.findOne({ username: username });

        if (!adminData || !adminData.password) {
          res.status(400).json({ message: "username not registerd" });
          return;
        }
        const isMatch = await comparePass(password, adminData.password);
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
            message:'login Success',
            id:adminData.id,
            username:adminData.username,
            token:Generatetoken(adminData.id)
         })

        
    })
    getallUsers=AsyncHandler(async (req:Request,res:Response) => {
        const users= await User.find()
        
        res.status(200).json({message:'success fetch all users',users:users})
        
    })
    setUserBlock=AsyncHandler(async (req:Request,res:Response) => {
      console.log("block user rendering...");
      
 
      const {userId}=req.body
      console.log("user ID",userId);
      if(!userId)
      {
        res.status(400).json({message:'invalid Id'})
        return
      }
      const userData=await User.findByIdAndUpdate(
        userId,
        {$set:{Delete:true}},
        {new:true})
      if (userData) {
        
        res.status(200).json({message :'user Blocked Success',userId:userData._id})
        return
      }
      res.status(400).json({message :'user Not Blocked'})
      
        
    })
    setUserUnBlock=AsyncHandler(async (req:Request,res:Response) => {
      const{userId}=req.body
      if(!userId)
      {
        res.status(400).json({message:'invalid userId'})
        return
      }

      const userData=await User.findByIdAndUpdate(userId,{
        Delete:false
      },{new:true})

      if (!userData)
      {

        res.status(400).json({mesaage:'not unblocked'})
        return
      }
      res.status(200).json({message:'Unblock success',userId:userData._id})
      return 
      
    })
    getEditUser=AsyncHandler(async (req:Request,res:Response) => {
      console.log("get edit user");
      
      const {userId}=req.params
      if (!userId) {
        console.log("not gettin user id ");
        
        res.status(400).json({message:'invalid id'})
        return
        
      }


      const userData=await User.findById(userId)
      if(!userData)
      {
        console.log("not user found ");
        
        res.status(400).json({message:'user not found'})
        return
      }

      console.log("user found success");
      
      res.status(200).json({message:'get edit user success', user:userData})
      
      return
    })
    setEditUser=AsyncHandler(async (req:Request,res:Response) => {
      console.log("setedit user renderingg");
      
      const{username,mobile,email,_id}=req.body
      console.log("user from edit",username,mobile,email,_id);
      if(!username || !mobile || !email|| !_id)
      {
        res.status(400).json({message:'invalid Data'})
        return
      }
      const userData=await User.findByIdAndUpdate(_id,{
        $set:{username:username,
          email:email,
          mobile:mobile
        }
        

      },{new:true})


      if(!userData)
      {
        res.status(400).json({message:'user Not Updated'})
        return
      }
      res.status(200).json({message:'user Update success',userData})

      
        
    })
    // getallUsers=AsyncHandler(async (req:Request,res:Response) => {
        
    // })
    
}

export default new AdminController()