"use strict";

const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose") 

var userSchema = new mongoose.Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    time : {
        type : Date, 
        default: Date.now
    }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);