const User = require("../models/user.js");

module.exports.renderSignupForm = (req,res)=>{
    res.render("users/signup.ejs"); // render signup.ejs
}

module.exports.signup = async (req,res)=>{
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username}); //save email and username inside the User signup schema
        const registerUser = await User.register(newUser,password); // rejister automatically detect already rejister user if not exits then create
        console.log(registerUser);
        req.login(registerUser,(err)=>{     // automatically login after signup
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wonderlust!");
            res.redirect("/listings");
        });
    }catch(err){
        req.flash("error",err.message);
        res.redirect("/signup");
    }
}

module.exports.renderLoginForm = (req,res)=>{
    res.render("users/login.ejs");  // render login.ejs
}

module.exports.login = async (req,res)=>{
    //passport.authenticate use for detect that user already exit in db or not if not then it show failureFlash message and redirect on "/login"
    req.flash("success","Welcome back to Wonderlust!");
    let redirectUrl = res.locals.redirectUrl|| "/listings"; // When res.locals.redirectUrl is undefined then user redirect on "/listings"
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next)=>{
    req.logout((err)=>{     // logout is passport method with remove the login session
        if(err){
            return next(err);
        }
        req.flash("success","Logged you out!");
        res.redirect("/listings");
    })
}