const userModel = require("../models/user.model");
const crypto =require("crypto");
const jwt=require('jsonwebtoken');
const bcrypt = require("bcryptjs");
   
   async function registerController(req,res){
    const {email,username,password,bio,profileImage}=req.body;
/*
    //& check email id is already exist or not
    const isUserExistByEmail=await userModel.findOne({email});
    if(isUserExistByEmail){
        return res.status(409).json({
            message:"user already exist with same email"
        })
    }

    const isUserExistByUsername=await userModel.findOne({username});
    if(isUserExistByUsername){
        return res.status(409).json({
            message:"user already exist with same username"
        })
    }
 */


    //^user exist or not
   const isUserAlreadyExist=await userModel.findOne({
    $or:[
        {username},
        {email}
    ]
   })

   if(isUserAlreadyExist){
           return res.status(409).json({
            message:"user already exist"
        })
   }

   //^ hashing one passward
//    const hash=crypto.createHash('sha256').update(password).digest('hex')

     const hash=await bcrypt.hash(password,10);

   //^ Create user in MongoDB
   const user=await userModel.create({
    username,
    email,
    bio,
    profileImage,
    password:hash
   })

   //^Create JWT
   const token=jwt.sign(
    {
        id:user._id
    },
    process.env.JWT_SECRET,
    {
        expiresIn :"1d"
    }
    )


    //^ Put JWT into cookie
    res.cookie("token",token)


    //^Send response
    res.status(201).json({
        message:"User register successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })
   

}

    async  function loginController(req,res){
    const {email,username,password,bio,profileImage}=req.body;

    const user=await userModel.findOne({
        $or:[
            {
                username
            },
            {
                email
            }
        ]
    })

    if(!user){
        return res.status(404).json({
            message:"user not found"
        })
    }

    
    const ispassword= await bcrypt.compare(password, user.password)

    if(!ispassword){
        return res.status(401).json({
            message:"invalid password"
        })
    }

    const token=jwt.sign(
        {id:user._id},
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    res.cookie("token",token)

    res.status(200)
    .json({
        message:"user login Successfully",
         user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })


}

module.exports={
    registerController,
    loginController
}