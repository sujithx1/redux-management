import { ReactNode } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../../store/store"
import { Navigate, useNavigate } from "react-router-dom"

interface ProtectedRoutes{
    children:ReactNode
}


const Protected:React.FC<ProtectedRoutes> = ({children}) => {
    const navigate=useNavigate()
    const{user}=useSelector((state:RootState)=>state.auth)
    // const{}=useSelector((state:RootState))
     console.log("user ptotect ",user);
     
    if(!user)
        {
            return<Navigate to={'/login'}/>
        }
        
        if (user?.Delete) {
            localStorage.removeItem('user'); 
            navigate('/login'); 
        }
  return children
}

export default Protected
