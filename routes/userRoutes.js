const express=require("express")
const authenticateMiddleware=require("../middleware/authenticate")
const router=express.Router()
const {
    register,
    login,
    forgetPassword
}=require("../controllers/userController")

router.post("/register",register);
router.post("/login",login);
router.put("/forgetPassword",forgetPassword)

module.exports=router;