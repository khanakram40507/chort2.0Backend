const express=require("express");
const postRouter=express.Router();
const postController=require("../controllers/post.controller")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})
const identifyUser=require("../middleware/auth.middleware")


//* /api/post/
postRouter.post("/", upload.single("image"), identifyUser, postController.createpostController)

/*
* GET /api/post/  [protected ]

*/

postRouter.get("/posts", identifyUser, postController.getPostController)

/* 
* GET /api/post/:id  [protected]
 ^ returns details of a specific post with the given id,and also check if the user is authorized to view the post or not
*/

postRouter.get("/details/:id", identifyUser, postController.getPostDetailsController)

module.exports=postRouter;