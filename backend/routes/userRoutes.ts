import express,{request as req, Response as res} from 'express';
import UserController from '../controllers/userController';
import { Auth } from '../middleware/authmiddleware';
import { upload } from '../helpers/multer';
const UserRouter=express.Router()

// UserRouter.get('/login',UserController.Getlogin)
UserRouter.post('/login',UserController.Setlogin)
UserRouter.post('/register',UserController.SetSignup)
UserRouter.get('/home',Auth,UserController.GetHome)
// UserRouter.put('/edit',UserController.UpdateUser)
UserRouter.delete('/delete',UserController.Deleteuser)
UserRouter.post('/logout',UserController.userLogout)
UserRouter.put('/updateUser',upload.single('image'),UserController.UpdateUser)
// UserRouter.put('/profilepic', UserController.ProfilePic)
export default UserRouter
