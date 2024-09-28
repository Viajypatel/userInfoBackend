const { userRegister,userLogin,getAlluser, getUserProfile} = require("../Controllers/userController");
const router=require("express").Router();
const {isAuthenticate}=require('../Middleware/isAuthenticate');
router.post("/register",userRegister);
router.post("/login",userLogin);
router.get("/getAlluser",getAlluser);
router.get("/getUserProfile",isAuthenticate,getUserProfile);
module.exports=router;