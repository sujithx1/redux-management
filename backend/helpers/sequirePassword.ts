import bcrypt from 'bcrypt'
export const HashPassword=async (password:string):Promise<string> => {
    const saltRound=10;
    const salt=await bcrypt.genSalt(saltRound);
    const hashedpassword=await bcrypt.hash(password,salt) 
    return hashedpassword
        
}

export const comparePass=async (enterdpassword:string,password:string):Promise<boolean> => {
    const isMatch=await bcrypt.compare(enterdpassword,password)
    return isMatch
    
}