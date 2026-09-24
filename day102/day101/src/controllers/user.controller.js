const followModel=require("../models/follow.model")
const userModel=require("../models/user.model")


//*controller to follow  accounts
async function followUserController(req,res){
    const followerUsername=req.user.username; //which user send the request ,his id,
    const followeeUsername=req.params.username; //which account ,the user want to follow tar username


    //^ check user is follow himself or not
    if(followeeUsername==followerUsername){
        return res.status(400).json({
            message:"you can not follow yourself"
        })
    }


    //^does followee account is exist
    const isFolloweeExist=await userModel.findOne({
        username:followeeUsername
    })


    //^ if not exist  then .......
    if(!isFolloweeExist){
        return res.status(404).json({
            message:"followee account does not exist"
        })
    }


    //^ check already user is follow the followee accout or not
    const isAllreadyFollowing=await followModel.findOne({
       follower: followerUsername,
       followee:followeeUsername
    })
    if(isAllreadyFollowing){
        return res.status(200).json({
            message:`you are already following ${followeeUsername}`,
            follow:isAllreadyFollowing
        })
    }



    //^ here create the edge collection
    const followRecord=await followModel.create({
        follower:followerUsername,
        followee:followeeUsername
    })

    res.status(201).json({
        message:`your following ${followeeUsername}`,
        follow: followRecord
    })


}

//* controller to unfollow
async function unfollowUserController(req,res){
    const followerUsername=req.user.username;
    const followeeUsername=req.params.username;


    //is user actually follow the account or not
    const  isUserFollowing=await followModel.findOne({
        follower:followerUsername,
        followee:followeeUsername
    })
    if(!isUserFollowing){
        return res.status(400).json({
            message:`${followerUsername} does not follow ${followeeUsername}`
        })
    }


    //* if user follow the username then find the delete it
    await followModel.findByIdAndDelete(isUserFollowing._id);

    res.status(200).json({
        message:"you are now unfollowed him"
    })


}


module.exports={
    followUserController,
    unfollowUserController
}