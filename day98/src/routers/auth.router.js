require("dotenv").config()
const express=require('express');
const jwt=require("jsonwebtoken")
const userModel = require('../models/user.model');
const authRouter=express.Router();



authRouter.post("/register", async (req,res)=>{
    const {name,email,password}=req.body;
    const isUserAllreadyExist =await userModel.findOne({email})
    if(isUserAllreadyExist){
        return res.status(400).json({
            messege:"this email id is already register"
        })
    }
    const user= await userModel.create({name,email,password});
    const token=jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET
    )
    res.cookie("jwt_token",token)
     res.status(201).json({  //201 means new resource created
        message:'user registered',
        user,
        token
    })

})


authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    const user=await userModel.findOne({email});
    if(!user){
        res.status(404).json({
            message:"user not found with this email address"
        })
    }
    const isPasswordMatch= user.password===password
    if(!isPasswordMatch){
        return res.status(401).json({
            message:"Invaild password"
        })
    }
     const token=jwt.sign(
        {
            id:user._id
        },
        process.env.JWT_SECRET
    )
    res.cookie("jwt_token",token)
    res.status(200).json({
        message:'user logged in succesfully ',
        user
    })
    

})

module.exports=authRouter;