"use strict";

const mongoose = require("mongoose");

var QuestionSchema = new mongoose.Schema({
    content: {
        type: String
    },
    anonymous: {
        type: Boolean,
        required: true
    },
    user: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    time : {
        type : Date, 
        default: Date.now
    }
});

module.exports = mongoose.model("Question", QuestionSchema);