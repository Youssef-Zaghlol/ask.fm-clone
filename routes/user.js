const express = require("express");
const router  = express.Router();
const passport = require('passport');
const { forwardAuthenticated, registerUser, userValidator } = require('../middleware/auth');


router.get("/register", forwardAuthenticated, (req, res) => {
    res.render("user/register", {errors: false});
    console.log(req.isAuthenticated())
});

router.post("/register", (req, res) => {
    let {email, username, password} = req.body;

    userValidator(email, username, password, res, "user/register",registerUser);
});

router.get("/login", (req, res) => {
    res.render("user/login", {errors: false});
    console.log(res.locals);
});

router.post("/login", forwardAuthenticated, (req, res, next) => {

    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/user/login',
        failure: true
      })(req, res, next);
});

module.exports = router;