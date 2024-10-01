
  import {  ChangeEvent, FormEvent, useEffect, useState } from 'react'
  import './userprofile.css'
  import { useDispatch, useSelector } from 'react-redux'
  import { AppDispatch, RootState } from '../../../store/store'
  import {   setUser, updateUser } from '../../../features/auth/UserService';
import Header from '../../../components/user/Header/Header';
import { useNavigate } from 'react-router-dom';


  interface Profile_User_Type{
    username:string;
    mobile:string;
    email:string;
    image:File | null;
    id:string,
    token:string

  }
  // interface ProfilePic_type{
  //   email:string;
  //   id:string;
  //   profilepic:File|null
  // }
  const UserProfile = () => {
  
    const {user}=useSelector((state:RootState)=>state.auth)
    console.log("user profile ",user);
    console.log("user profile image",user?.image);

    const navigate=useNavigate()
    
    const dispatch=useDispatch<AppDispatch>()
    
useEffect(()=>{
  const storedUser=localStorage.getItem('user')
  if (storedUser) {
    dispatch(setUser(JSON.parse(storedUser)));

    
  }
},[dispatch])
const profilepicurl=user?.image?`http://localhost:3001/uploads/${user.image}`
:"https://via.placeholder.com/150"
console.log("profile pic =" ,user?.image);


    const [userData,setUserData]=useState<Profile_User_Type>({
      username:user?.username || "",
      email:user?.email || "",
      mobile:user?.mobile||"",
      image: null,
      id:user?.id||"",
      token:user?.token || ""

    })
    

    console.log(user)
    const{username,email,mobile}=userData


    const handleOnchange=(e:ChangeEvent<HTMLInputElement>)=>{
      


        setUserData((prevState)=>({
          ...prevState,
          [e.target.name]:e.target.value
        }))

    }
    const [preview, setPreview] = useState<string>('');






    const handleProfilePic=(e:ChangeEvent<HTMLInputElement>)=>{
    
    const file = e.target.files ? e.target.files[0] : null;
      if (file) {
        setUserData((prevState) => ({ 
          ...prevState,
          image: file 
          }
          ));
          


        // Display a preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }

    }
    
    
    const handleSubmitBtn=async(e:FormEvent)=>{
      e.preventDefault()
      const updatedUserData = {
        ...userData,
        image: userData.image || user?.image as File // Keep the existing image if no new file is selected
      };
      console.log("Updated user data:", updatedUserData);
      console.log("user",userData);
      const result=await dispatch(updateUser(updatedUserData))
      if(result)
      {
        navigate('/')
      
      }

      

    }

    return (
      
      <>
      <Header/>
      
        
      <div className="profile-container">
    <h1 className="profile-title">Profile Page</h1>

    <div className="profile-img-container">
      <img
        src={preview  || profilepicurl  }
        alt="Profile"
        className="profile-img"
      />
      <label htmlFor="file-upload" className="edit-icon">
        <i className="fas fa-pencil-alt"></i>
      </label>
      <input id="file-upload" type="file" accept="image/*" onChange={handleProfilePic} className="upload-btn" />
    </div>

    <div className="profile-form">
      <div className="profile-details">
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="username"
          value={username}
          name="username"
          onChange={handleOnchange}
          placeholder="Enter your name"
          className="profile-input"
        />
      </div>

      <div className="profile-details">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={handleOnchange}
          placeholder="Enter your email"
          className="profile-input"
        />
      </div>
      <div className="profile-details">
        <label htmlFor="email">mobile:</label>
        <input
          type="mobile"
          id="mobile"
          name="mobile"
          value={mobile}
          onChange={handleOnchange}
          placeholder="Enter your mobile"
          className="profile-input"
        />
      </div>
      <div>
        <button onClick={handleSubmitBtn}>submit</button>
      </div>
    </div>
  </div>


      </>
    )
  }

  export default UserProfile
