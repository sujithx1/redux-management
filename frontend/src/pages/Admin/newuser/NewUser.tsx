import { ChangeEvent, FC, FormEvent, useEffect, useState } from "react"
import './newuser.css'
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { adminreset, CreateNewUSer } from "../../../features/auth/AdminService";
import Headeradmin from "../../../components/admin/header/Headeradmin";
import {  useNavigate } from "react-router-dom";


interface NewUserTypesfromAdmin{
    username:string;
    email:string;
    mobile:string;
    password:string;
}

const NewUser:FC = () => {
  const navigate=useNavigate()


    const dispatch=useDispatch<AppDispatch>()
    

    const {isError,message,isSuccess}=useSelector((state:RootState)=>state.admin)
    useEffect(()=>{
      if (isError) {
        toast.error(message)
        
      }
      if (isSuccess) {
        toast.success('user created')
        navigate('/admin/home',{replace:true})
      
        
      }
      dispatch(adminreset())
    

    },[isError,message,dispatch,isSuccess,navigate])

    const [newuser,setNewuser]=useState<NewUserTypesfromAdmin>({
        username:'',
        email:'',
        mobile:'',
        password:''

    })


    const{username,email,mobile,password}=newuser
    
   const handleValidation=()=>{
    let isValid=true;
    if (username.trim()=="") {
        toast.error('username required')
        isValid=false
        
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
   
    toast.error('Invalid Email')
    isValid=false
    
  }
  if (mobile.length ==0 || mobile.length <10  || mobile.length>10 ) {
   
    toast.error("Invalid Mobile")

    isValid=false
    
  }
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            
            
  if (!strongPasswordRegex.test(password)) {
      toast.error("Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character.")
      isValid=false
      
      
  }
  



    return isValid
   }

   const handleOnchange=(e:ChangeEvent<HTMLInputElement>)=>{
    setNewuser((prev)=>({
        ...prev,
        [e.target.name]:e.target.value
    }))

   }

   const handleSubmitBtn=(e:FormEvent)=>{
    e.preventDefault()
    



    if (handleValidation()) {
         dispatch(CreateNewUSer(newuser))
       
        

        
    }

   }


    
  return (
   <>
   <Headeradmin/>


<div className="new-user-container">
        <form className="new-user-form">
          <h2>Create a New Account</h2>
          <input value={username} onChange={handleOnchange} type="text" name="username" id="username" placeholder="Username" />
          <input value={email}  onChange={handleOnchange} type="email" name="email" id="email" placeholder="Email" />
          <input value={mobile} onChange={handleOnchange} type="text" name="mobile" id="mobile" placeholder="Mobile" />
          <input value={password} onChange={handleOnchange} type="password" name="password" id="password" placeholder="Password" />
          <button type="submit"onClick={handleSubmitBtn} className="submit-btn">Submit</button>
        </form>
      </div>



   </>
  )
}

export default NewUser