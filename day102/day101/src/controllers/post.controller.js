const postModel=require("../models/post.model");
const likeModel=require("../models/like.model")
const jwt=require("jsonwebtoken");
const ImageKite=require("@imagekit/nodejs");
const { toFile }=require("@imagekit/nodejs");



const imagekit=new ImageKite({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
})


//^controller for create a post
async function createpostController(req,res){  
    //this code written for jo image agigi usko server se imagekit me upload karne ke liye
    const file=await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: "Test",
        folder:"cohort-2-insta-clone-posts"
    })  



    const post=await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:req.user.id
    })

    res.status(201).json({
        message:"post created successfully",
        post
    })


    
}

//^controller for see the all the posts
async function getPostController(req,res){
  

    const userId=req.user.id;

    const posts=await postModel.find({user:userId});

    res.status(200).json({
        message:"posts fetched successfully",
        posts
    })
}


//^controller to see a particuler postdetails
async function getPostDetailsController(req,res){
    
    const userId=req.user.id;
    const postId=req.params.id;

    const post=await postModel.findOne({_id:postId, user:userId}); //this will check if the post with the given id belongs to the user or not ans hold the post deatails in the post variable

    if(!post){
        return res.status(404).json({
            message:"post not found"
        })
    }
    const isAuthorized=post.user.toString()===userId;
    if(!isAuthorized){
        return res.status(403).json({
            message:"you are not authorized to view this post"
        })
    }

    res.status(200).json({
        message:"post details fetched successfully",
        post
    })
}


//^controller to like a post
async function likePostController(req,res){
    const username=req.user.username
    const postId=req.params.id;

    const post=await postModel.findById(postId)
    if(!post){
        return res.status(404).json({
            message:"page not found",            
        })
    }
    const like=likeModel.create({
        post:postId,
        username
    })

    res.status(201).json({
        message:"you like this post",
        like
    })


}

module.exports={
    createpostController,
    getPostController,
    getPostDetailsController,
    likePostController
}