"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");
const {userValidator, isLoggedIn} = require("../middleware/index");

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

router.post("/register", (req, res, next) => {
    let {username, password} = req.body;

    if  ( 0 < userValidator(req, res, username, password)) {
        res.redirect("/register");
    } else{
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
    }
});

router.post("/login", (req, res, next) => {
    let username = req.body.usernmae || false;
    let password = req.body.password || false;
    console.log(req.body.vehicle1)

    if  ( 0 < userValidator(req, res, username, password)) {
        res.redirect("/register");
    } else {
        passport.authenticate("local", (err, user, info) => {
            if(err){
                req.flash("error", "Something went wrong, please try again");
                return res.redirect("/login");
            } 
            req.logIn(user, function(err) {
                if (err) {
                    req.flash("error", "Username or password must be wrong");
                    return res.redirect("/login");
                }
                else {
                    req.flash("success", "Welcome back");
                    return res.redirect("/question/myQuestion")
                }
            });
        })(req, res, next);
    }
});

router.get("/logout", isLoggedIn, function(req ,res){
    req.logOut();
    req.flash("success", "Logged You Out")
    res.redirect("/");
});

module.exports = router;