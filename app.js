"use strict";

// all requirements
const express = require("express");
const mongoose = require("mongoose");
const flash = require("connect-flash")
const ejs = require("ejs");
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const session = require("express-session"); 
const app = express();

// requireing routes
const userRoutes = require("./routes/user");

// Passport Config
require('./middleware/passport')(passport);

// app setup
mongoose.connect("mongodb://localhost/ask-fm", { useNewUrlParser: true, useUnifiedTopology: true});

// setting the view engine
app.set("view engine", "ejs");

// body Parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

// Cookies middleware
app.set('trust proxy', 1); // trust first proxy
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// set static folder
app.use(express.static("/public"));

// flash middleware
app.use(flash());

// global Vars
app.use(function(req, res, next){
    // res.locals.currentUser = req.user;
    res.locals.error = req.flash("error")
    res.locals.error_msg = req.flash("error_msg");
    res.locals.success_msg = req.flash("success_msg");
    next();
});

//The routes
app.get("/", (req, res) => {
    res.render("index");
    console.info(res.locals);
});

app.use("/user", userRoutes)


const url = process.env.PORT || "3000";
app.listen(url, (err) => {
    if(err) console.log(err);
    else console.log("Server started");
});