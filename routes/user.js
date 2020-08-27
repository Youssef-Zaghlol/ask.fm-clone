const express = require("express");
const router  = express.Router();
const passport = require('passport');
const { forwardAuthenticated, registerUser } = require('../middleware/auth');


router.get("/signup", forwardAuthenticated, (req, res) => {
    res.render("user/signup");
});

router.post("/signup", registerUser);

router.get("/login", (req, res) => {
    res.render("user/login");
    console.log(res.locals);
});

router.post("/login", forwardAuthenticated, (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/users/login',
        failureFlash: true
      })(req, res, next);
});

module.exports = router;