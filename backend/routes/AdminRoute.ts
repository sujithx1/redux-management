import express,{request as req ,response as res} from 'express';
import adminController from '../controllers/adminController';
const AdminRoute=express.Router()

AdminRoute.post('/login',adminController.adminlogin)
AdminRoute.get('/users',adminController.getallUsers)
AdminRoute.put('/block',adminController.setUserBlock)
AdminRoute.put('/unblock',adminController.setUserUnBlock)
AdminRoute.get('/edit/:userId',adminController.getEditUser)
AdminRoute.put('/update',adminController.setEditUser)



export default AdminRoute 