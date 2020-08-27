const express = require("express");
const router  = express.Router();
const passport = require('passport');
const { forwardAuthenticated, registerUser } = require('../middleware/auth');


router.get("/register", forwardAuthenticated, (req, res) => {
    res.render("user/register");
});

router.post("/register", registerUser);

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