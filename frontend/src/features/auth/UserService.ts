import axios, { AxiosError } from "axios";
// import { IntialStateType, UserType } from "./authSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import Cookies from 'universal-cookie';
const cookies = new Cookies();


export interface UserType{
        id?:string;
        username?:string;
        email:string;
        mobile?:string
        password:string;
        token?:string;
        image?:string | File;
        Delete?:boolean
    
    }
    interface Updateuser{
        username:string;
        email:string;
        mobile:string;
        id:string;
        image?:File | null;
        token?:string
    }
    
 
    export interface IntialStateType{
        user:UserType | null;
        isError:boolean;
        isSuccess:boolean;
        isLoading:boolean;
        message:string;
       
    
    }
    

 const API_URL = 'http://localhost:3001/api/auth';




export const registerUser=createAsyncThunk(
    'user/registerUser',


async (userData:UserType,thunkAPI) => {
    console.log("User Data ",userData);
    try {
        const response=await axios.post(`${API_URL}/register`,userData,{
            headers: {
                'Content-Type': 'application/json',
              },
              
        })
        
        if(response.data)
        {
            localStorage.setItem('user',JSON.stringify(response.data))
    
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

export const userLogout=createAsyncThunk('user/logout',async (_,thunkAPI) => {
    try {
      
    await axios.post(`${API_URL}/logout`, {},);

    localStorage.removeItem('user');
  

    return null;
    } catch (err) {
        console.log(err);
        return thunkAPI.rejectWithValue('failed to logout')
        
        
    }
    
})

export const userLogin=createAsyncThunk<UserType,UserType, { rejectValue: string } >('user/login',async (userData,thunkAPI) => {
    console.log("userlogin ", userData);

    try {
        const response = await axios.post(`${API_URL}/login`, userData, {
          headers: {
            "Content-Type": "application/json",
          },
        });
    
        if (response.data) {
          localStorage.setItem("user", JSON.stringify(response.data));
          console.log("user daata",response.data);
          
        }
    
        return response.data; // This needs to match UserType
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
export const updateUser=createAsyncThunk('user/profile',async(userData:Updateuser)=>{

    console.log("user Edit ",userData);
    const formdata=new FormData()
    formdata.append('username',userData.username)
    formdata.append('email',userData.email)
    formdata.append('mobile',userData.mobile)
    formdata.append('id',userData.id)
    console.log("user id ",userData.id);
    
    // formdata.append('token',userData.token || "")
    const token=cookies.get('userToken')
    console.log("tokennnnnnnnnnc fromm update user",token);
    
    if (userData.image) {
        formdata.append('image',userData.image)
        
    }
    
    
      

    const response=await axios.put(`${API_URL}/updateUser`,formdata,{
        headers:{
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }

    })
    if(response.data)
        {
            console.log("response daata update user",response.data);
            
            localStorage.setItem('user',JSON.stringify(response.data))
    
        }
    
    
        return response.data



 })




const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user') as string) : null;




const initialState : IntialStateType={
    user:user?user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:"",
   

}
export const authSlice=createSlice({
    name:'Userauth',
    initialState,
    reducers:{
        reset:(state)=>{
            state.isLoading=false
            state.isSuccess=false
            state.isError=false
            state.message=""
            
        },
        clearUser:(state)=>{
            state.user=null
            
        },
        setUser: (state, action) => {
            state.user = action.payload;
          },
          
         
        
    },
    extraReducers:(builder)=>{
        builder
        .addCase(registerUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(registerUser.fulfilled,(state,action)=>{
            state.isLoading=false   ;
            state.isSuccess=true;
            state.user=action.payload
        })
        .addCase(registerUser.rejected,(state,action)=>{
            state.isLoading=false;
            state.isError=true;
            state.message=action.payload as string;
            state.user=null
        })
        .addCase(userLogout.fulfilled,(state)=>{
            state.user=null;
            state.isSuccess=false;
            state.isError=false;
            state.isLoading=false;
            state.message='Logout success';
            cookies.remove('userToken')

        })
        .addCase(userLogout.rejected, (state, action) => {
            state.isError = true;
            state.message = action.payload as string;
        })
        .addCase(userLogin.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(userLogin.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.user=action.payload
            cookies.set('userToken',action.payload.token,{path:'/',maxAge:7 * 24 * 60 * 60})

        })
        .addCase(userLogin.rejected,(state,action)=>{
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload as string
            state.user=null
        })
        .addCase(updateUser.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(updateUser.fulfilled,(state,action)=>{
            state.isLoading=false;
            state.isSuccess=true;
            state.user=action.payload
        })
        .addCase(updateUser.rejected,(state,action)=>{
            state.isSuccess=false;
            state.isError=true;
            state.message=action.payload as string
            state.user=null
        })
    
    }

})



// const authService={
//     registerUser
// }

// export default authService
export const {reset,clearUser,setUser}=authSlice.actions
export default authSlice.reducer;
