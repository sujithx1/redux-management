import { FC, ReactNode } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { Navigate } from "react-router-dom"




interface ProtectedRoutes{
    children:ReactNode
}

const ProtectAdmin:FC<ProtectedRoutes> = ({children}) => {
   
    const {admin}=useSelector((state:RootState)=>state.admin)
    if (!admin) {
        return<Navigate to={'/admin/login'}/>
    
        
    }
  return  children
}

export default ProtectAdmin