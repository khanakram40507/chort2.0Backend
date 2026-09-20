const postModel=require("../models/post.model");
const ImageKite=require("@imagekit/nodejs");
const { toFile }=require("@imagekit/nodejs");
const jwt=require("jsonwebtoken");

const imagekit=new ImageKite({
    privateKey:process.env.IMAGEKIT_PRIVATE_KEY,
})

async function createpostController(req,res){
    console.log(req.body,req.file);

    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            message:"unauthorized"
        })
    }

    let decoded;
  try{
       decoded=jwt.verify(token,process.env.JWT_SECRET);
  }
  catch(err){
   return res.status(401).json({
        message:"unauthorized"
    })
  }

    console.log(decoded);


    //this code written for jo image agigi usko server se imagekit me upload karne ke liye
    const file=await imagekit.files.upload({
        file:await toFile(Buffer.from(req.file.buffer),'file'),
        fileName: "Test",
        folder:"cohort-2-insta-clone-posts"
    })  



    const post=await postModel.create({
        caption:req.body.caption,
        imgUrl:file.url,
        user:decoded.id
    })

    res.status(201).json({
        message:"post created successfully",
        post
    })


    
}


async function getPostController(req,res){
    const token=req.cookies.token;
    let decoded;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return res.status(401).json({
            message:"unauthorized"
        })
    }

    const userId=decoded.id;

    const posts=await postModel.find({user:userId});

    res.status(200).json({
        message:"posts fetched successfully",
        posts
    })
}

async function getPostDetailsController(req,res){
    const token=req.cookies.token;
    let decoded;
    try{
        decoded=jwt.verify(token,process.env.JWT_SECRET);
    }catch(err){
        return res.status(401).json({
            message:"unauthorized"
        })
    }

    const userId=decoded.id;
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

module.exports={
    createpostController,
    getPostController,
    getPostDetailsController
}