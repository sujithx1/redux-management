import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import {FaUser} from "react-icons/fa"

import {useSelector,useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {registerUser,reset } from "../../../features/auth/UserService";
import { AppDispatch, RootState } from "../../../store/store";
import Spinner from "../../../components/user/spinner/Spinner";
import './register.css'
// import Header from "../../components/user/Header/Header";


interface FormDataType{
    username:string;
    email:string;
    mobile:string;
    password:string;
    password2:string;


}


const Register = () => {

    const [formData,setFormData]=useState<FormDataType>({
        username:'',
        email:'',
        mobile:'',
        password:'',
        password2:''
    })

    const {username,email,mobile,password,password2}=formData

      const navigate=useNavigate()
      const dispatch:AppDispatch=useDispatch()
      const {user,isLoading,isError,isSuccess,message}=useSelector((state:RootState)=>state.auth)
      useEffect(()=>{
        if(isError)
        {
          toast.error(message)
        }
        if (isSuccess || user) {
          navigate('/login')
          
        }
        dispatch(reset())

      },[user,isError,isSuccess,message,navigate,dispatch])
    const onChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }   

    const [error,setError]=useState<FormDataType>({
        username:'',
        email:'',
        mobile:'',
        password:'',
        password2:''
        
    })
    
    const validateForm=():boolean=>{
        let isValid:boolean=true;
        const newError:FormDataType={
            username:'',
            email:'',
            mobile:'',
            password:'',
            password2:''

        }
        if (username.trim()=="") {
            newError.username="username is required"
            isValid=false;

            
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(email)) {
            newError.email="Invalid Email format"
            isValid=false
        }
        if(mobile.trim()=="" || ! /^\d{10}$/.test(mobile) )
            {
                newError.mobile="Mobile number is must 10 digits"
                isValid=false
            }
            const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            
            
            if (!strongPasswordRegex.test(password)) {
                newError.password="Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
                isValid=false
                
                
            }
            if(password!==password2)
        {
            newError.password2="Password dosent match"
            isValid=false   
        }


        setError(newError)



        return isValid

    }
    const SubmitBtn=(e:FormEvent)=>{
        e.preventDefault()
       if (validateForm()) {
        console.log("form data" ,formData);
        const userData={
          username,
          email,
          mobile,
          password
        }
         dispatch(registerUser(userData))
        
       }
        
    }

    if(isLoading)
    {
      return<Spinner/>
    }
  return (
      <>
   <div className="register-container">
      <form className="register-form" onSubmit={SubmitBtn}>
        <h2>Register <FaUser/></h2>
        
        {/* <label htmlFor="username">Username</label> */}
        <input
          type="text"
          name="username"
          value={username}
          onChange={onChange}
          placeholder="Enter username"
        />
     {error.username && <p className="error">{error.username}</p>}

        
       
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Enter email"
        />
        
        {/* <label htmlFor="mobile">Mobile</label> */}
          {error.email && <p className="error">{error.email}</p>}
        <input
          type="text"
          name="mobile"
          value={mobile}
          onChange={onChange}
          placeholder="Enter mobile number"
        />
        {error.mobile && <p className="error">{error.mobile}</p>}
        
        {/* <label htmlFor="password">Password</label> */}
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Enter password"
        />
        {error.password && <p className="error">{error.password}</p>}
        
        {/* <label htmlFor="password2">Confirm Password</label> */}
        <input
          type="password"
          name="password2"
          value={password2}
          onChange={onChange}
          placeholder="Confirm password"
          />
          {error.password2 && <p className="error">{error.password2}</p>}
        
        <button type="submit" className="submit-btn">Submit</button>
      </form>
    </div>
   </>
  )
}

export default Register