const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    userName:{
        type:String,
        unique:[true ,"user name already exists"],
        required:[true,"user name is required"]
    },
    email:{
        type:String,
        unique:[true,"email already exists"],
        required:[true,"email is required"]
    },
    password:{
        type:String,
        required:[true,"password is required"]
    },
    bio:String,
    profileImage:{
        type:String,
        default:""
    }

