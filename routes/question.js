"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");
const Question = require("../models/question");
const {isLoggedIn} = require("../middleware/index");


router.get("/myQuestion", isLoggedIn, (req, res) => {
    res.render("./question/myQuestion");
});

router.get("/add", isLoggedIn, (req, res) => {
    res.render("./question/addQuestion");
});

router.post("/add", isLoggedIn, (req, res) => {
    let {content, anonymous} = req.body;
    // converts the string to a boolean
    if(anonymous === "on"){
        anonymous = true;
    } else if(anonymous === undefined) {
        anonymous = false;
    }

    if(content === "") {
        req.flash("error", "You have to write a question");
        return res.redirect("/question/add");
    } else {
        Question.create({
            content,
            anonymous,
            user: {
                id: req.user._id,
                username: req.user.username
            }
        }, function(err, question){
            if(err){
                console.log(err);
                req.flash("error", err.message);
                return res.redirect("/question/add");
            } else {
                req.flash("success", "Your question has been added");
                res.redirect("/question/myQuestion");
            }
        });
    }
});


module.exports = router;