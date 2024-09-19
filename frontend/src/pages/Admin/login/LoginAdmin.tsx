import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import './login.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { adminLogin, adminreset } from "../../../features/auth/AdminService";
import Spinner from "../../../components/user/spinner/Spinner";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
interface AdminLogin{
    username:string;
    password:string;
}
interface AdminLoginError{
    usernamerror:string;
    passworderror:string;
}

const LoginAdmin = () => {


    const navigate=useNavigate()
    const {admin,isError,isLoading,isSuccess,message}=useSelector((state:RootState)=>state.admin)
    const dispatch=useDispatch<AppDispatch>()

    useEffect(()=>{
        if(isError)
        {
          toast.error(message)
        }
        if ((isSuccess )) {
          toast.success("login completed")
          
          navigate('/admin/home',{replace:true})
          
        }
        dispatch(adminreset())
  
      },[admin,isError,isSuccess,message,navigate,dispatch])
    const [adminlogin , setAdminlogin]=useState<AdminLogin>({
        username:"",
        password:""
    })
    const{username,password}=adminlogin

    const [error,setError]=useState<AdminLoginError>({
        usernamerror:"",
        passworderror:""
    })

    
    const handleOnchange=(e:ChangeEvent<HTMLInputElement>)=>{
        setAdminlogin((prev)=>({
            ...prev,
            [e.target.name]:e.target.value
        }))

    }
    

    
    let isValid:boolean;
    const handleValidation=()=>{
        const newError:AdminLoginError={
            usernamerror:"",
            passworderror:""
        }
        if(username.trim()==="")
        {
            newError.usernamerror="username is Valid"
            isValid=false
           


        }else
        {
            newError.usernamerror=""
            isValid=true
        }
        if(password.trim()=="")
        {
            newError.passworderror="enter password"
            isValid=false

        }else
        {
            newError.passworderror=""
            isValid=true
        }

        setError(newError)
        return isValid
    }
    
    const handleSubmit=(e:FormEvent)=>{
        e.preventDefault()
        if(handleValidation())
        {
            console.log("login data",adminlogin);
            dispatch(adminLogin(adminlogin))
            dispatch(adminreset())

            
        }
       


    }
    if(isLoading)
        {
          return<Spinner/>
        }

  return (
   <>
       <div className="login-container">
      <div className="login-card">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={username}
              onChange={handleOnchange}
              placeholder="Enter your username"
             
            />
          </div>
          <p style={{color:'red'}}>{error && error.usernamerror}</p>
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={handleOnchange}
              placeholder="Enter your password"
              
            />
          </div>
          <p style={{color:"red"}} >{error && error.passworderror}</p>
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
      
    </>
  )
}

export default LoginAdmin
