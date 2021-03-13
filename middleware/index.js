"use strict";

const middleware = {
    isLoggedIn: function(req, res, next){
        if(req.isAuthenticated()){
            return next();
        }
        else{
            req.flash("error", "You need to be logged in to do that");
            return res.redirect("/login");
        }
    },
    userValidator: (req, res, username, password) => {
        let errs = 0;

        if(username.length < 3) {
            errs += 1;
            req.flash("error", " Username must be loger than 3 characters ");
        }
        if(username.length > 16) {
            errs += 1;
            req.flash("error", " Username must be shorter than 16 characters ");
        }
        if(password.length < 6){
            errs += 1;
            req.flash("error", " Password must be loger than 6 characters ");
        }
        if(password.length > 16) {
            errs += 1;
            req.flash("error", " Password must be shorter than 16 characters ");
        }

        if(errs > 0){
            return errs;
        }
    }
}

module.exports = middleware;