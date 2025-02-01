const express = require("express");     
const wrapAsync = require("../utils/wrapAsync");
const router = express.Router();  
const User = require("../models/user.js");   //  require user.js of signup schema 
const passport = require("passport");   // include passport (npm passport documentation)
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/users.js");

router.route("/signup")
    .get(userController.renderSignupForm)   // for signup get request
    .post(wrapAsync(userController.signup))   // post request for signup (create new user)

router.route("/login")
    .get(userController.renderLoginForm)   // Login get request     
    .post( saveRedirectUrl,                 // login post request
        passport.authenticate("local", {failureRedirect:"/login",failureFlash:true}),
        userController.login
    )
    
//logout route
router.get("/logout",userController.logout)

module.exports = router;