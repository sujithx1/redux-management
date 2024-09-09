import mongoose,{Document,Schema} from "mongoose";

export interface TypeUser extends Document{

    username:string;
    email:string;
    mobile:string;
    password:string | undefined;
    Delete:boolean
}

const UserSchema:Schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    mobile:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true
    },
    Delete:{
        type:Boolean,
        default:false   
    }
},{
    timestamps:true
})


const User=mongoose.model<TypeUser>('User',UserSchema)

export default User