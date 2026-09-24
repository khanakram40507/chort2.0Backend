const express=require("express")
const userRouter=express.Router()
const userController=require("../controllers/user.controller")
const identifyUser=require("../middleware/auth.middleware")


/*
    * @routes POST/api/users/follow/:userid
  @description follow a user
  @access private 
*/
userRouter.post("/follow/:username",identifyUser, userController.followUserController)

/*
    * @routes POST/api/users/follow/:userid
  @description unfollow a user
  @access private 
*/
userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)




module.exports=userRouter;