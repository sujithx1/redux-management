import jwt, { JwtPayload } from 'jsonwebtoken';
import AsyncHandler from 'express-async-handler';
import User, { TypeUser } from '../models/userModel';
import express from 'express';

let jwt_secret = process.env.JWT_SECRETKEY || "sujith123";

declare global {
    namespace Express {
        interface Request {
            user?: TypeUser;
        }
    }
}

export const Auth = AsyncHandler(async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    console.log("Auth calling");
let token = req.header('Authorization')?.replace('Bearer ', '').trim();


if (!token) 
    {
        res.status(401).json({ error: 'Access denied' });
        return 
    }
console.log(token.replace(/^"|"$/g, ''));
token = token.replace(/^"|"$/g, '');// this is not complicate its just removing "(this one)
try {
    const decoded = jwt.verify(token, jwt_secret) as JwtPayload & { id: string };

 console.log("decodeeeeeeeeeeeeeeeeeeeee",decoded);
 
 if (typeof decoded === 'object' && 'id' in decoded) {
    req.user = await User.findById(decoded.id).select('-password');
    
    next();
} else {
    throw new Error('Token does not contain an id');
}
 

 } catch (error) {
 res.status(401).json({ error: 'Invalid token' });
 }
 


});
