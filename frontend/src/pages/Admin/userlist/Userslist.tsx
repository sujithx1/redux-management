import {  useEffect, useState } from "react"
import Headeradmin from "../../../components/admin/header/Headeradmin"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "../../../store/store"
import { adminreset, BlockUser, getAllusers, getUserEdit, UnblockUser, UserTypes } from "../../../features/auth/AdminService"
// import Spinner from "../../../components/user/spinner/Spinner"
import './userlistsadmin.css'
import { useNavigate } from "react-router-dom"



const Userslist = () => {



    

  const [serachitem ,setSearchitem]=useState<string>("")
  const navigate=useNavigate()
    const dispatch=useDispatch<AppDispatch>()
    const{users,isError}=useSelector((state:RootState)=>state.admin)
    

    useEffect(()=>{

     dispatch(getAllusers())
     .unwrap()
     .then((res)=>{console.log("fetch users",res);
      dispatch(adminreset())
     })
     .catch((err)=>{console.log("fetch err",err);
     })

      
      

    },[dispatch])
    console.log("usersss",users);
    
    
  const handleBlockButton=(id:string)=>{
    console.log("id blcked",id);
    
   
    dispatch(BlockUser(id))




  }
  const handleUnBlockButton=(id:string)=>{
    dispatch(UnblockUser(id))


  }

  const handleEditUser=async(id:string)=>{
   try {
  const result= await dispatch(getUserEdit(id)).unwrap();
  if (result) {

    navigate('/admin/user/edit')
    
  }
    
   } catch (error) {
    console.error("Error editing user:", error);
    
   }
   


  }

  const filterSerch=users.filter((user:UserTypes)=>
     user.username.toLowerCase().includes(serachitem.toLowerCase())||
     user.email.toLowerCase().includes(serachitem.toLowerCase()))


   


  return (
    <>
    <Headeradmin/>
    <div className="admin-dashboard">
    <input 
  type="text" 
  placeholder="Search users" 
  value={serachitem}
  onChange={(e) => setSearchitem(e.target.value)} 
  className="search-input"
/>
   
      {isError && <p className="error-message">Error: {isError}</p>}

      <div className="table-container">
            <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Image</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filterSerch.map((user: UserTypes,index) => (
              <tr key={user._id}>
                <td>{index+1}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.mobile}</td>

                <td>
                  <img src={`http://localhost:3001/uploads/${user.image}`} alt={user.username} className="user-avatar" />
                </td>
                <td style={user.Delete?{color:'red'}:{color:'green'}}>{user.Delete ? 'Deleted' : 'Active'}</td>
                <td>
                  {
                  user.Delete?
                  <button className="unblock-btn"onClick={()=>{
                    handleUnBlockButton(user._id)
                   
                    
                  }} >Unblock</button>
                  :
                  <button className="block-btn"onClick={()=>{handleBlockButton(user._id)
                    
                    
                  }} >Block</button>
                  }
                  <button className="edit-btn" onClick={()=>handleEditUser(user._id)} >Edit</button>
                  
                </td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

      
    </>
  )
}

export default Userslist
