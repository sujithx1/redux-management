
import  Jwt, { JwtPayload }  from "jsonwebtoken";
import {NextFunction, Request ,Response } from 'express'


declare global {
    namespace Express {
        interface Request {
            userId?: string ;
        }
    }
}

let jwt_secret = process.env.JWT_SECRETKEY || "sujith123";
export const userauth=(req:Request,res:Response,next:NextFunction)=>{

    const token=req.cookies.token;
    if (token) {
        const verifyToken= Jwt.verify(token,jwt_secret)as JwtPayload & { id: string };
        if (!verifyToken) return res.status(401).json({message:'Unauthorized'})

            console.log("verify token id",verifyToken.id);
            
     req.userId = verifyToken.id
     next()
     
    }
    else
    {
       return res.status(401).json({ message: "authorization denied" });
    }
}