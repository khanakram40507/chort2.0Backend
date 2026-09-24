const userModel = require("../models/user.model");
const crypto =require("crypto");
const jwt=require('jsonwebtoken'); 
const bcrypt = require("bcryptjs"); //here we install npm i bcrypt

//* Register controller

async function registerController(req,res){

    try{
           const {email,username,password,bio,profileImage}=req.body;

    const isUserExist=await userModel.findOne({
        $or:[
            {username},
            {email}
        ]
    })
    if(isUserExist){
        return res.status(400).json({
            message:"user already exist"
        })
    }

    const hashPassword=await bcrypt.hash(password,10)

    const user=await userModel.create({
        email,
        username,
        password:hashPassword,
        bio,
        profileImage
    })

    const token=jwt.sign(
        {
        id: user._id,
        username: user.username
    },
        
        process.env.JWT_SECRET,
        {expiresIn:"1d"}
    )

    const cookie=res.cookie("token",token)

    res.status(201).json({
        message:"user register successfully",
        user:{
            email:user.email,
            username:user.username,
            bio:user.bio,
            profileImage:user.profileImage
        }
    })

    }
    catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
 

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
        {id:user._id,
          username:user.username
        },
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

async function getAllUsers(req, res) {

    try {

        const users = await userModel.find();

        res.status(200).json({
            message: "All users fetched successfully",
            count: users.length,
            users
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to fetch users"
        });
    }
}
module.exports={
    registerController,
    loginController,
    getAllUsers
}