

import mongoose, {Document, Schema} from 'mongoose'

interface TypeAdmin extends Document{
    username:string;
    password:string;
}

const AdminSchema:Schema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        requried:true
    }
},
{
    timestamps:true
})

const Admin=mongoose.model<TypeAdmin>('Admin',AdminSchema)
export default Admin