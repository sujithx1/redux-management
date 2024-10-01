import jwt, { JwtPayload } from "jsonwebtoken";
const AccessToken_SecretKey = process.env.AccessToken_SECRETKEY || "access123";
const REFRESH_TOKEN_SECRET=process.env.REFRESH_TOKEN_SECRET||"refresh123"
import {Request,Response} from'express'

const refreshTokens:string[]=[]

export const GenerateAccessToken = (id: string): string => {
  return jwt.sign({ id}, AccessToken_SecretKey, {
    expiresIn: "15m",
    algorithm: 'HS256'
  });
};


export const GenerateRefreshToken=(id:string):string=>{
  const refreshToken=jwt.sign({id},REFRESH_TOKEN_SECRET,{
    expiresIn:'7d'
  })
  refreshTokens.push(refreshToken)
  return refreshToken
}


export const createAccessToken=(req:Request,res:Response)=>{

  const refreshtoken=req.cookies.refreshToken
  if(!refreshtoken || refreshTokens.includes(refreshtoken))
  {

    return  res.status(403).json({ message: "Refresh token is invalid or missing." });
  }
  jwt.verify(refreshtoken,REFRESH_TOKEN_SECRET,(err:Error|null,decoded:string | JwtPayload | undefined )=>{
    if(err) 
      {
        return  res.status(403).json({ message: "Token verification failed." })
      }


      let id: string;
      if (typeof decoded === 'string') {
        // Handle the case where the decoded token is a string
        id = decoded;
      } else if (typeof decoded === 'object' && (decoded as JwtPayload).id) {

        // Handle the case where the decoded token is an object and has an `id`
        id = (decoded as JwtPayload).id as string;
      } else {
        return res.status(403).json({ message: "Invalid token structure." });
      }

      const newAccessToken=GenerateAccessToken(id)
      res.json({accessToken:newAccessToken})
  })

}