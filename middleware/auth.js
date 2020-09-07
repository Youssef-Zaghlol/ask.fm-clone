const User = require("../models/user");
const bcrypt = require('bcryptjs');

module.exports = {
    ensureAuthenticated: function(req, res, next) {
      if (req.isAuthenticated()) {
        return next();
      }
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
      let errors = [];

      if (!username || !email || !password ) {
        errors.push( 'Please enter all fields' );
      }

      const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

      if(!(emailRegexp.test(email))) {
        errors.push("Email must be in correct format");
      }
    
      if (password.length < 6) {
        errors.push('Password must be at least 6 characters');
      }
    
      if (errors.length > 0) {
        res.locals.error = errors

        res.render('user/register', {
          errors,
          username,
          email
        });
        next();

      } else {
        User.findOne({ email: email })
          .then(function(user){

            if(user){
                errors.push("This email is already taken");

                // Reroutes to registration page
                res.render('user/register', {
                  errors,
                  username,
                  email
                });
                next();

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
                            next();
                        }).catch(function(err){
                            console.log(err);
                        });
                    });
                });
            }
          });
      }
    }
    
  };