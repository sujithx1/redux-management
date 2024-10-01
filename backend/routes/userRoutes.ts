import express,{request as req, Response as res} from 'express';
import UserController from '../controllers/userController';
import { Auth } from '../middleware/authmiddleware';
import { upload } from '../helpers/multer';
// import { userauth } from '../middleware/Authentication';
const UserRouter=express.Router()


// UserRouter.get('/login',UserController.Getlogin)
UserRouter.post('/login',UserController.Setlogin)
UserRouter.post('/register',UserController.SetSignup)
UserRouter.get('/home',UserController.GetHome)
UserRouter.delete('/delete',UserController.Deleteuser)
UserRouter.post('/logout',UserController.userLogout)
UserRouter.put('/updateUser',Auth,upload.single('image'),UserController.UpdateUser)

export default UserRouter
