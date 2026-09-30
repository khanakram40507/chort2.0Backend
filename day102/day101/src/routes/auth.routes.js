const express=require("express");
const userModel = require("../models/user.model");
const crypto =require("crypto");
const  authRouter=express.Router();  //^Create a Router object and store its reference in the variable authRouter.
const jwt=require('jsonwebtoken')
const authController=require("../controllers/auth.controller")
const identifyUser=require("../middleware/auth.middleware")


authRouter.post("/register",authController.registerController )


authRouter.post("/login",authController.loginController )

authRouter.get("/getAllUsers",authController.getAllUsers)


/*
*@route GET /api/auth/get-me
describe the details of logged in user
@access private
*/
authRouter.get("/getme",identifyUser,authController.getMeController)


module.exports= authRouter;