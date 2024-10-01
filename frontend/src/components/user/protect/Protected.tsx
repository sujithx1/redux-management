import { ReactNode } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { Navigate, useLocation } from "react-router-dom"

interface ProtectedRoutes{
    children:ReactNode
}


const Protected:React.FC<ProtectedRoutes> = ({children}) => {
    const{user}=useSelector((state:RootState)=>state.auth)
    // const{}=useSelector((state:RootState))
     console.log("user ptotect ",user);

    const location=useLocation()
     
    if(!user && location.pathname !== '/login')
        {
            return<Navigate to={'/login'} replace/>
        }
  return  <>{children}</>;
}

export default Protected
