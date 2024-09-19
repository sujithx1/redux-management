import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import {FaSignInAlt} from "react-icons/fa"
import './login.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { reset, userLogin } from "../../../features/auth/UserService";
import Spinner from "../../../components/user/spinner/Spinner";
import 'react-toastify/dist/ReactToastify.css'; // Import this CSS file
import Header from "../../../components/user/Header/Header";




interface FormDataType{
   
    email:string;

    password:string;
   


}


const Login = () => {

    // const [hasShownToast, setHasShownToast] = useState(false); // State to track toast display
    const navigate=useNavigate()
    const dispatch:AppDispatch=useDispatch()
    const {user,isLoading,isError,isSuccess,message}=useSelector((state:RootState)=>state.auth)
    useEffect(()=>{
      if(isError)
      {
        toast.error(message)
      }
      if ((isSuccess )) {
        toast.success("login completed")
        
        navigate('/',{replace:true})
        
      }
      dispatch(reset())

    },[user,isError,isSuccess,message,navigate,dispatch])

    const [formData,setFormData]=useState<FormDataType>({
      
        email:'',
        
        password:'',
       
    })

    const {email,password}=formData


    const onChange=(e:ChangeEvent<HTMLInputElement>)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.name]:e.target.value
        }))
    }   

    const [error,setError]=useState<FormDataType>({
       
        email:'',
       
        password:'',
        
        
    })
    
    const validateForm=():boolean=>{
        let isValid:boolean=true;
        const newError:FormDataType={
           
            email:'',
           
            password:'',
          

        }
       
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailPattern.test(email)) {
            newError.email="Invalid Email format"
            isValid=false
        }
       
            const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
            
            
            if (!strongPasswordRegex.test(password)) {
                newError.password="Password must be at least 8 characters long, include at least one uppercase letter, one lowercase letter, one number, and one special character."
                isValid=false
                
                
            }
           


        setError(newError)



        return isValid

    }
    const SubmitBtn=(e:FormEvent)=>{
        e.preventDefault()
       if (validateForm()) {
        console.log("form data" ,formData);
        dispatch(userLogin(formData))
        
       }
        
    }
    if(isLoading)
        {
          return<Spinner/>
        }
  return (
      <>
      <Header/> 
   <div className="login-container">
      <form className="login-form" onSubmit={SubmitBtn}>
        <h2>Login <FaSignInAlt/></h2>
        
       
        
       
        <input
          type="email"
          name="email"
          value={email}
          onChange={onChange}
          placeholder="Enter email"
        />
        
        {/* <label htmlFor="mobile">Mobile</label> */}
          {error.email && <p className="error">{error.email}</p>}
   
        {/* <label htmlFor="password">Password</label> */}
        <input
          type="password"
          name="password"
          value={password}
          onChange={onChange}
          placeholder="Enter password"
        />
        {error.password && <p className="error">{error.password}</p>}
        
     
        
        <button type="submit" className="login-btn">Submit</button>
      </form>
    </div>
   </>
  )
}

export default Login