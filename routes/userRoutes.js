const express=require("express")
const authenticateMiddleware=require("../middleware/authenticate")
const router=express.Router()
const {
    register,
    login,
    forgetPassword
}=require("../controllers/userController")

const {
    createPost,
    getPosts,
    updatePost,
    deletePost,
    likePost,
    addComment
  } = require("../controllers/postController");

router.post("/register",register);
router.post("/login",login);
router.put("/forgetPassword",forgetPassword)

router.use(authenticateMiddleware)
.post("/posts", createPost)
.get("/posts/:userId", getPosts)
.put("/posts",  updatePost)
.delete("/posts",  deletePost)
.post("/posts/like",  likePost)
.post("/posts/comment", addComment)


module.exports=router;