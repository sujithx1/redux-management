import jwt, { JwtPayload } from 'jsonwebtoken';
import User, { TypeUser } from '../models/userModel';
import express from 'express';
import AsyncHandler from 'express-async-handler';

let jwt_secret = process.env.AccessToken_SECRETKEY || "access123";

declare global {
    namespace Express {
        interface Request {
            user?: TypeUser;
        }
    }
}

export const Auth = AsyncHandler (async (req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> => {
    console.log("Auth calling");
let token = req.header('Authorization')?.replace('Bearer ', '').trim();


if (!token) 
    {
        console.log("no tokeennnnn");
        
        res.status(401).json({ error: 'Access denied' });
        return 
    }
    console.log(token);
    try {
    
console.log(token.replace(/^"|"$/g, ''));
// token = token.replace(/^"|"$/g, '');// this is not complicate its just removing "(this one)




    const decoded = jwt.verify(token, jwt_secret) as JwtPayload & { id: string };
    console.log("decoded .. " ,decoded);
    

 
 
 if (typeof decoded === 'object' && 'id' in decoded) {
    console.log("decodedd///..........");
    
    const user = await User.findById(decoded.id).select('-password');
    if(!user)
    {
        console.log("no user... ");
        

        res.status(401).json({ error: 'User not found.' });
        return;

    }
    if (user.Delete) {
        console.log("user is blocked...");
        
        res.status(403).json({ error: 'User is blocked by admin.' });
        return;
    }
    req.user=user
    
    next();
} else {
    console.log("no decode....");
    
    throw new Error('Token does not contain an id');
}
 

 } catch (error) {
    console.log("invalid token");
    
 res.status(401).json({ error: 'Invalid token' });
 }
 


});
