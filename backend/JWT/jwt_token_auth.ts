import jwt from "jsonwebtoken";
const jwt_secret = process.env.JWT_SECRETKEY || "sujith123";

export const Generatetoken = (id: string): string => {
  return jwt.sign({ id}, jwt_secret, {
    expiresIn: "10d",
    algorithm: 'HS256'
  });
};
