import { ChangeEvent, FormEvent, useState } from "react"
import {FaSignInAlt} from "react-icons/fa"
import './login.css'



interface FormDataType{
   
    email:string;

    password:string;
   


}


const Login = () => {

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
        
       }
        
    }
  return (
      <>
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