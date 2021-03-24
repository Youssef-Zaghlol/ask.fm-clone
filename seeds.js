const mongoose   = require("mongoose");
const User = require("./models/user")
const Question = require("./models/question");

function seedDB(){
    User.deleteMany({}, (err) => {
        if(err) {
            console.log(err);
        } else {
            console.log("deleted users");
            // creating a user
            User.register({username: "youssef"}, "howareyou"
            , (err, createdUser) => {
                if(err) {
                    console.log(err);
                } else {
                    console.log("created the user")
                    // add the data
                    let data = [
                        {
                            content: "How old r u?1",
                            anonymous: true,
                            user: {
                                id: createdUser._id,
                                username: createdUser.username
                            }
                        },
                        {
                            content: "How old r u?2",
                            anonymous: false,
                            user: {
                                id: createdUser._id,
                                username: createdUser.username
                            }
                        },
                        {
                            content: "How old r u?3",
                            anonymous: true,
                            user: {
                                id: createdUser._id,
                                username: createdUser.username
                            }
                        },
                        {
                            content: "How old r u?4",
                            anonymous: false,
                            user: {
                                id: createdUser._id,
                                username: createdUser.username
                            }
                        },
                        {
                            content: "How old r u?5",
                            anonymous: true,
                            user: {
                                id: createdUser._id,
                                username: createdUser.username
                            }
                        },
                        {
                            content: "How old r u?6",
                            anonymous: false,
                            user: {
                                id: createdUser._id,
                                username: createdUser.username
                            }
                        },
                        {
                            content: "How old r u?7",
                            anonymous: true,
                            user: {
                                id: createdUser._id,
                                username: createdUser.username
                            }
                        },
                        {
                            content: "How old r u?8",
                            anonymous: false,
                            user: {
                                id: createdUser._id,
                                username: createdUser.username
                            }
                        },
                        {
                            content: "How old r u?9",
                            anonymous: true,
                            user: {
                                id: createdUser._id,
                                username: createdUser.username
                            }
                        },
                        {
                            content: "How old r u?10",
                            anonymous: false,
                            user: {
                                id: createdUser._id,
                                username: createdUser.username
                            }
                        },
                        {
                            content: "How old r u?11",
                            anonymous: true,
                            user: {
                                id: createdUser._id,
                                username: createdUser.username
                            }
                        }
                    ];

                    // Remove all questions
                    Question.deleteMany({}, function(err){
                        if(err){
                            console.log(err);
                        } else{
                            console.log("removed questoins");

                            // adding the questions
                            data.forEach(function(seed){
                                Question.create(seed, function(err, question){
                                    if(err) {
                                        console.log(err);
                                    } else {
                                        console.log("Added a question");
                                    }
                                });
                            });
                        }                        
                    });
                }
            });
        }
    });
}

module.exports = seedDB;