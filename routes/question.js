"use strict";

const express = require("express");
const router = express.Router();
const passport = require("passport");
const question = require("../models/question");
const {isLoggedIn} = require("../middleware/index");


router.get("/myQuestion", isLoggedIn, (req, res) => {
    res.render("./question/myQuestion");
});

module.exports = router;