import { Request } from "express";
import multer from"multer";
import path from "path";
import fs from 'fs'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, '..', 'uploads');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath);
      }
      cb(null, uploadPath);
   
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });
  
  export const upload=multer({storage:storage})
//   export interface UserUpdateRequest extends Request {
//     body: {
//       id: string;
//       email: string;
//       username: string;
//       mobile: string;
//     };
//     file?: Express.Multer.File; // Add file to the request type
//   }

