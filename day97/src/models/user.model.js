const mongoose=require("mongoose");
const userSchema= new mongoose.Schema({
    name:"String",
    email:{
        type:"String",
        unique:true
    },
    password:"string"
})

const userModel=mongoose.model("users",userSchema);

module.exports=userModel