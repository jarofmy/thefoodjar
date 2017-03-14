var express = require("express"),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    methodOverride = require("method-override"),
    User = require("./models/user"),
    app = express(),
    flash = require("connect-flash");
    // Campground = require("./models/campground"),
    // seedDB = require("./seeds"),
    // Comment = require("./models/comment");

//Requiring Routes
var photoRoutes    = require("./routes/photos"),
    commentRoutes       = require("./routes/comments"),
    indexRoutes         = require("./routes/index");
    
mongoose.connect("mongodb://jarofmy:djibouti614@ds031892.mlab.com:31892/thefoodjar");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// seedDB(); //seed the database

// PASSPORT CONFIGURATION

app.use(require("express-session")({
    secret: "We really made it my guy",
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

app.get("/", function(req, res){
    res.render("landing");
});

app.use("/", indexRoutes);
app.use("/photos/:id/comments", commentRoutes);
app.use("/photos", photoRoutes);

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server's up and running fam");
});