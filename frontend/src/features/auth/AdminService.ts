import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { UserType } from "./UserService";
// import { UserType } from "./UserService";

interface AdminType{
    id:string;
    token:string;
    username:string;
    
}
interface UserEditTypes{
    _id:string;
    username:string;
    email:string;
    mobile:string;
    
}


interface AdminLogin{
    username:string;
    password:string;
}
export interface UserTypes{
        _id:string;
        username:string;
        email:string;
        mobile:string;
        image:string;
        Delete:boolean;
   
}
interface AdminIntialState{
    admin:AdminType | null;
    users:UserTypes[];
    user:UserTypes | null;
    isError:boolean;
    isSuccess:boolean;
    isLoading:boolean;
    message:string;

}

// interface UpdateResponse {
//     message: string;
//     updatedUser: UserTypes; // Adjust according to the structure of your API response
//   }
const Admin_URL = 'http://localhost:3001/api/admin';

export const  adminLogin=createAsyncThunk<AdminType,AdminLogin,{rejectValue: string;}>('/admin/login',
    async (adminData,thunkAPI) => {
   
        try {
            
            const response= await axios.post(`${Admin_URL}/login`,adminData,{
                 headers:{
                     'Content-Type':'application/json'
                 }
                 
             })
             if (response.data) {
                 localStorage.setItem('admin',JSON.stringify(response.data))
                 console.log("admin adata",response.data);
                 
                 
                }
                return response.data
        } catch (err) {
            const error = err as AxiosError;
            interface ErrorResponseData {
                message: string;
            }
            let message: string;
          
    if (error.response && error.response.data) {
        const data = error.response.data as ErrorResponseData;
        
        message = data.message || 'An unknown error occurred';
      } else {
        message = error.message || error.toString();
      }
        
    return thunkAPI.rejectWithValue(message);
  }
            
        
    

    
 })


 export const getAllusers=createAsyncThunk<UserTypes[]>('/admin/users',async (_,{rejectWithValue}) => {


    try {
        
        const response=  await axios.get(`${Admin_URL}/users`,{
              headers:{
                  'Content-Type':'application/json'
              }
      
      
          })
          
        
         return response.data.users
        
         
    } catch (error) {
        const err = error as AxiosError        
        return rejectWithValue(err.response?.data || 'Something went wrong');
        
    }
    
 }) 

 export const BlockUser=createAsyncThunk('/admin/users/block',async (userId:string,{rejectWithValue}) => {

    try {
        console.log("blocked.. user admin server",userId);
        
        const response=await axios.put(`${Admin_URL}/block`,{userId},{
            headers:{
                'Content-Type':'application/json'
            }
    
        })
        if (response.data)
            
            return { userId, message: response.data.message }; // You can return other data if needed

            
        
        
    } catch (error) {

        const err= error as AxiosError
        return rejectWithValue(err.response?.data || 'Something went wrong');


        
    }
    
 })

 export const UnblockUser=createAsyncThunk('/admin/users/unblock',async (userId:string,{rejectWithValue}) => {

    try {
        
        
        const response= await axios.put(`${Admin_URL}/unblock`,{userId})
        return {userId,message:response.data.message}
        
    } catch (error) {
        const err= error as AxiosError
        return rejectWithValue(err || 'something error ' )
        
    }
    
 })
 export const getUserEdit=createAsyncThunk<UserTypes,string>('/admin/user/edit',async (userId:string,{rejectWithValue}) => {

    try {
        const response=await axios.get(`${Admin_URL}/edit/${userId}`)
        return response.data.user  
    } catch (error) {
        const err= error as AxiosError
        rejectWithValue(err || "somthing error ")
        
    }
    
 })

 export const UpdateEditUser=createAsyncThunk('/admin/users/update',
    async (userData:UserEditTypes,{rejectWithValue}) => {
    try {
        console.log("userDataa",userData);
      
        
        const response = await axios.put(`${Admin_URL}/update`, userData, {
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
        if (response.data) 
            return response.data
            
        
        
    } catch (error) {
        const err = error as AxiosError
        rejectWithValue(err)
    }
    
 })
 const admin = localStorage.getItem('admin') ? JSON.parse(localStorage.getItem('admin') as string) : null;


 const initialState :AdminIntialState ={
    admin:admin?admin:null,
    users:[],
    user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
   

}


export const adminSlice=createSlice({
    name:'adminSlice',
    initialState,
    reducers:{
        adminreset:(state)=>{
          state.isError=false;
          state.isLoading=false;
          state.isSuccess=false;
          state.message=""; 
        },
        clearAdmin:(state)=>{
            localStorage.removeItem('admin');
            state.admin=null
    
          },

    },
    extraReducers:(builder)=>{
        builder
        .addCase(adminLogin.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(adminLogin.fulfilled,(state,action:PayloadAction<AdminType>)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.admin=action.payload
        })
        .addCase(adminLogin.rejected,(state,action)=>{
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload as string;

        }).addCase(getAllusers.pending,(state)=>{
            state.isLoading=true
            
        })
        .addCase(getAllusers.fulfilled,(state,action:PayloadAction<UserTypes[]>)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.users=action.payload
        })
        .addCase(getAllusers.rejected,(state,action)=>{
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload as string
        })
        .addCase(BlockUser.pending,(state)=>{
            state.isLoading=true;

        })
        .addCase(BlockUser.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isSuccess=true
            const userindex=state.users.findIndex(user=>user._id===action.payload?.userId)
            if (userindex !== -1) {
                state.users[userindex].Delete=true
                 
            }
            const userDataStr=localStorage.getItem('user')
           const userData:UserType|null= userDataStr? JSON.parse(userDataStr) : null;
           if(userData)
           {

            if(userData.id===action.payload?.userId)
            {
                userData.Delete=true
                console.log("user dataa aaa",userData);
                
                localStorage.setItem('user',JSON.stringify(userData))
            }
         
               
           }
        
            console.log("user from admin service", state.users);
            
            
        })
        .addCase(BlockUser.rejected,(state,action)=>{
            state.isSuccess=false
            state.isError=true
            state.message=action.error as string
        })
        .addCase(UnblockUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(UnblockUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            const unserIndex=state.users.findIndex(user=>user._id===action.payload.userId)
            if(unserIndex!==-1)
            {
                state.users[unserIndex].Delete=false
            }
            const userDataStr=localStorage.getItem('user')
            const userData:UserType|null= userDataStr? JSON.parse(userDataStr) : null;
            if(userData)
            {
 
             if(userData.id===action.payload?.userId)
             {
                 userData.Delete=false;
                 console.log("user dataa aaa",userData);
                 
                 localStorage.setItem('user',JSON.stringify(userData))
             }
          
                
            }
        })
        .addCase(UnblockUser.rejected,(state,action)=>{
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload as string
        })
        .addCase(getUserEdit.pending,(state)=>{
            state.isLoading=true

        })
        .addCase(getUserEdit.fulfilled,(state,action:PayloadAction<UserTypes>)=>{
            console.log("Payload from getUserEdit.fulfilled:", action.payload)
            state.isLoading=false;
            state.isSuccess=true;
            state.user=action.payload
        })
        .addCase(getUserEdit.rejected,(state,action)=>{
            state.isSuccess=false;
            state.isError=true;
            state.message= action.payload as string
        })
        .addCase(UpdateEditUser.pending,(state)=>{
            state.isLoading=true;

        })
        .addCase(UpdateEditUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.user=action.payload
            
            
        })
        .addCase(UpdateEditUser.rejected,(state,action)=>{
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload as string
        })

        
    }





   
    
})


export const {adminreset,clearAdmin} =adminSlice.actions
export default adminSlice.reducer