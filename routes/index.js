"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const {userValidator} = require("../middleware/index");
const user = require("../models/user");

// The index page
router.get("/", function(req, res){
    res.render("index");
});


// AUTHENTICATION ROUTES

router.get("/register", (req ,res) => {
    res.render("register");
});

router.get("/login", (req ,res) => {
    res.render("login");
});

router.post("/register", (req, res) => {
    let {username, password} = req.body;
    
    userValidator(req, res, username, password);

        User.find({username: username}, user => {
            if(user) {
                req.flash("error", "This username is already taken");
            } else {
    
                // registering the user
                User.register(new User({username: username}), password, function(err, user){
                    if(err){
                        console.log(err);
                        req.flash("error", err.message);
                        return res.render("register");
                    } else {
                        passport.authenticate("local")(req, res, function(){
                            req.flash("success", "Welcome to Ask.fm " + user.username);
                            res.redirect("/");
                        });
                    }
                });
            }
    });
});

router.post("/login", 
    passport.authenticate("local", {
        successRedirect: "/",
        successFlash: "Welcome back",
        failureRedirect: "/login",
        failureFlash: "Username or passwor dmust be wrong"
}));



router.get("/logout", function(req ,res){
    req.logOut();
    req.flash("success", "Logged You Out")
    res.redirect("/");
});

module.exports = router;