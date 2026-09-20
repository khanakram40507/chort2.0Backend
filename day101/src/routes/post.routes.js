const express=require("express");
const postRouter=express.Router();
const postController=require("../controllers/post.controller")
const multer=require("multer")
const upload=multer({storage:multer.memoryStorage()})


//* /api/post/
postRouter.post("/", upload.single("image"), postController.createpostController)

/*
* GET /api/post/  [protected ]

*/

postRouter.get("/posts", postController.getPostController)

/* 
* GET /api/post/:id  [protected]
 ^ returns details of a specific post with the given id,and also check if the user is authorized to view the post or not
*/

postRouter.get("/details/:id", postController.getPostDetailsController)

module.exports=postRouter;