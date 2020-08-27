const User = require("../models/user");
const bcrypt = require('bcryptjs');

module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash('error_msg', 'Please log in to view that resource');
      res.redirect('/users/login');
    },
    forwardAuthenticated: function(req, res, next) {
      if (!req.isAuthenticated()) {
        return next();
      }
      res.redirect('/dashboard');      
    },
    registerUser: function(req, res, next) {
      let {email, username, password} = req.body;


      User.findOne({ email: email })
        .then(function(user){

            if(user){
                // Reroutes to registration page
                res.redirect("/user/signup");
            } else {
                // Create a new 'User' using our model
                const newUser = new User({
                    email: email,
                    username: username,
                    password: password
                });

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(newUser.password, salt, (err, hash) => {
                      if (err) throw err;
                      newUser.password = hash;

                        // Saves password to mongoDB database
                        newUser.save().then(function(){
                            res.redirect('/user/login');
                        }).catch(function(err){
                            console.log(err);
                        });
                    });
                });
            }
    });
    }
    
  };