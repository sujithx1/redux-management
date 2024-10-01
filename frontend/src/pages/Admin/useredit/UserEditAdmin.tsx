import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import Headeradmin from "../../../components/admin/header/Headeradmin"
import './userEdit.css'
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../store/store";
import { useNavigate } from "react-router-dom";
import { UpdateEditUser } from "../../../features/auth/AdminService";
import { toast } from "react-toastify";

interface UserEditFromAdmin{
    username:string;
    email:string;
    mobile:string;
    _id:string;

}
interface ErrorUserEditTypes{
  username:string;
  email:string;
  mobile:string;
}
const UserEditAdmin = () => {
    const navigate=useNavigate()
    const dispatch=useDispatch<AppDispatch>()


    const {user}=useSelector((state:RootState)=>state.admin)
    console.log("usersss",user);
    


    const [formdata,setFormdata]=useState<UserEditFromAdmin>({
        username:'',
        email:'',
        mobile:'',
        _id:""
    })
    useEffect(() => {
        if (user) {
            console.log("User data:", user);
          setFormdata({
            username: user.username || '',
            email: user.email || '',
            mobile: user.mobile || '',
            _id:user._id||""
          });
        }
        console.log(user?.username);
        
      }, [user]);


      // const [err,setErr]=useState<ErrorUserEditTypes>({
      //   username:"",
      //   email:"",
      //   mobile:""
      // })

      
      
    
    const handleOnchange=(e:ChangeEvent<HTMLInputElement>)=>{
      


        setFormdata((prevState)=>({
          ...prevState,
          [e.target.name]:e.target.value
        }))

    }

const {username,email,mobile}=formdata

const handleValidation=():boolean=>{
  let isValid=true
  const newError:ErrorUserEditTypes={
    username:'',
    email:'',
    mobile:''
  }
  if (username.trim()=="") {
    newError.username="username required"
    toast.error(newError.username)

    isValid=false

    
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    newError.email="Invalid Email"
    toast.error(newError.email)
    isValid=false
    
  }
 
  if (mobile.length ==0 || mobile.length <10  || mobile.length>10 ) {
    newError.mobile="Invalid mobile"
    toast.error(newError.mobile)

    isValid=false
    
  }
  
  

  return isValid

}



    const handleUpdateUser= async(e:FormEvent,formdata:UserEditFromAdmin)=>{
      e.preventDefault()
      console.log("form data from handleUodateuser",formdata);
      
      if (handleValidation()) {
        
        const result=await dispatch(UpdateEditUser(formdata))
        if (result) {
         navigate('/admin/users')
          
        }
      }
        
        


    }


  return (
    <>
    <Headeradmin/>

    <div className="user-edit-container">
        <h2>Edit User</h2>

        <form className="user-edit-form" >
          <div className="form-group">
            <label>Username</label>
            <input 
              type="text" 
              name="username" 
              value={username}
               onChange={handleOnchange}
              placeholder="Enter Username" 
              
            />
            
          </div>

          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={email}
              onChange={handleOnchange}
             
              placeholder="Enter Email" 
           
            />
          </div>

          <div className="form-group">
            <label>Mobile</label>
            <input 
              type="text" 
              name="mobile" 
             value={mobile}
             onChange={handleOnchange}
              placeholder="Enter Mobile Number" 
              
            />
          </div>

          <div className="form-buttons">
            <button type="button" className="btn-update"onClick={(e:FormEvent)=>handleUpdateUser(e,formdata)} >Update</button>
            <button type="button" className="btn-cancel"onClick={()=>navigate('/admin/users')} >Cancel</button>
          </div>
        </form>
      </div>


    
    
    
    </>
  )
}

export default UserEditAdmin