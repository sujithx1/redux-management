import express,{Application,request as req,response  as res } from 'express';
import dotenv from 'dotenv';
import colors from 'colors'
import mongoose from 'mongoose'
import { errorHandler } from './middleware/errorMiddleware';
import UserRouter from './routes/userRoutes';
import AdminRoute from './routes/AdminRoute';
dotenv.config()
const app:Application=express()
const mongoUrl:string=process.env.MONGO_URI || "";
mongoose
  .connect(mongoUrl)
  .then(() => console.log(colors.green('MongoDB Connected')))
  .catch((error) => console.log(colors.red(`MongoDB Connection Error: ${error}`)));
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use('/',UserRouter)
app.use('/admin',AdminRoute) 
app.use(errorHandler)


const port=process.env.PORT || 3003
app.listen(port,()=>console.log(colors.green(`server Running ${port}`)))
