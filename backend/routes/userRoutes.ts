import express,{request as req, Response as res} from 'express';
import UserController from '../controllers/userController';
import { Auth } from '../middleware/authmiddleware';
const UserRouter=express.Router()

UserRouter.get('/login',UserController.Getlogin)
UserRouter.post('/login',UserController.Setlogin)
UserRouter.post('/signup',UserController.SetSignup)
UserRouter.get('/home',Auth,UserController.GetHome)
UserRouter.put('/edit',UserController.UpdateUser)
UserRouter.delete('/delete',UserController.Deleteuser)

export default UserRouter
