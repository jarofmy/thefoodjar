var express = require("express");
var router = express.Router();
var passport = require("passport");
var User = require("../models/user");

// =======================
// AUTHENTICATION ROUTES
// =======================

//Root route
router.get("/register", function(req, res) {
    res.render("register");
});
// handle sign up logic
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Welcome to The Food Jar " + user.username);
            res.redirect("/photos");
        });
    });
});

//SHOW LOGIN FORM
router.get("/login", function(req, res) {
    res.render("login");
});

router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/photos",
        failureRedirect: "/login"
    }), function(req, res) {
        req.flash("success", "Welcome to The Food Jar " + req.body.username);
        res.redirect("/photos");
});

// LOG OUT ROUTE
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged you out!");
    res.redirect("/");
});

module.exports = router;