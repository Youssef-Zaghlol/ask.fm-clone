"use strict";

const express        = require("express");
const app            = express();
const bodyParser     = require("body-parser");
const mongoose       = require("mongoose");
const passport       = require("passport");
const LocalStrategy  = require("passport-local");
const flash          = require("connect-flash");
const User           = require("./models/user");

mongoose.connect("mongodb://localhost/ask-fm", {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});


// app setup
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(flash());

// PASSSPORT config
app.use(require("express-session")({
    secret: "sdrtfyguhnjm",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Routes
const indexRoutes = require("./routes/index");
const questionsRoutes = require("./routes/question");

app.use(indexRoutes);
app.use("/question", questionsRoutes);

app.listen(process.env.PORT || "3000", function(err){
    if(err) throw err
    console.log("Server Is Running");
});