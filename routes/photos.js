var express = require("express");
var router = express.Router();
var Photo = require("../models/photo");
var middleware = require("../middleware/index");

//INDEX - Show all photos
router.get("/", function(req, res){
    // res.render("photos", {photos: photos});
    //Get all photos from DB and render that file
    Photo.find({}, function(err, allPhotos){
        if(err){
            console.log("Errrrrrror!!!");
        } else {
            res.render("photos/index", {photo: allPhotos, currentUser: req.user});
        }
    });
});

//Create Route - add new photo to database
router.post("/", middleware.isLoggedIn, function(req, res){
    //get data from form and add to photo array (standard convention below)
    var name = req.body.name;
    var spot = req.body.spot;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var newPhoto = {name: name, spot: spot, image: image, description: description, author: author};
    // photos.push(newPhoto);
    // Create new photo and save to DB
    Photo.create(newPhoto, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect to photos page
            console.log(newlyCreated);
            res.redirect("/photos");
        }
    });
});

//New Route - Show form to create new photo
router.get("/new", middleware.isLoggedIn, function(req, res){
    res.render("photos/new");
});

//SHOW Route - shows more info about one photo
//Show route uses :id, so make sure to order it at the bottom of the page
// otherwise it will override other GET requests
router.get("/:id", function(req, res){
    //find the photo with provided ID
    Photo.findById(req.params.id).populate("comments").exec(function(err, foundPhoto){
        if(err){
            console.log("Error bruh");
        } else {
            console.log(foundPhoto);
        //render template with that photo
            res.render("photos/show", {photo: foundPhoto});
        }
    });
});

//EDIT PHOTO ROUTE
router.get("/:id/edit", middleware.checkOwnership, function(req, res) {
    Photo.findById(req.params.id, function(err, foundPhoto){
        res.render("photos/edit", {photo: foundPhoto});
    });
});

//UPDATE PHOTO ROUTE
router.put("/:id", middleware.checkOwnership, function(req, res){
    //find and update correct photo
    Photo.findByIdAndUpdate(req.params.id, req.body.photo, function(err, updatedPhoto){
        if(err){
            req.flash("error", "Photo not found.");
            res.redirect("/photos");
        } else {
            //redirect to somehwere(show page)
            res.redirect("/photos/" + req.params.id);
        }
    });
});

//DESTROY Photo Route
router.delete("/:id", middleware.checkOwnership, function(req, res){
    Photo.findByIdAndRemove(req.params.id, function(err){
        if(err){
            res.redirect("/photos");
        } else {
            res.redirect("/photos");
        }
    });
});

module.exports = router;