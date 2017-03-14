var express = require("express");
var router = express.Router({mergeParams: true});
var Photo = require("../models/photo");
var Comment = require("../models/comment");
var middleware = require("../middleware/index");

// ================
// COMMENTS ROUTES
// ================

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    Photo.findById(req.params.id, function(err, photo){
        if(err){
            console.log("error");
        } else {
            res.render("comments/new", {photo: photo});
        }
    });
});

//Comment Create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup photo using ID
    Photo.findById(req.params.id, function(err, photo) {
        if(err){
            console.log("Err");
            res.redirect("/photos");
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log("Error creating comment");
                } else {
                    //add username and ID to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //connect new comment to photo
                    photo.comments.push(comment);
                    photo.save();
                    //redirect photo showpage
                    req.flash("succes", "Successfully added comment!");
                    res.redirect("/photos/" + photo._id);
                }
            });
        }
    });
});

//COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {photo_id: req.params.id, comment: foundComment});
        }
    });
});

//COMMENTS UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/photos/" + req.params.id);
        }
    });
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment was successfully deleted.")
            res.redirect("/photos/" + req.params.id);
        }
    });
});

module.exports = router;var express = require("express");
var router = express.Router({mergeParams: true});
var Photo = require("../models/photo");
var Comment = require("../models/comment");
var middleware = require("../middleware/index");

// ================
// COMMENTS ROUTES
// ================

//Comments New
router.get("/new", middleware.isLoggedIn, function(req, res){
    Photo.findById(req.params.id, function(err, photo){
        if(err){
            console.log("error");
        } else {
            res.render("comments/new", {photo: photo});
        }
    });
});

//Comment Create
router.post("/", middleware.isLoggedIn, function(req, res){
    //lookup photo using ID
    Photo.findById(req.params.id, function(err, photo) {
        if(err){
            console.log("Err");
            res.redirect("/photos");
        } else {
            //create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log("Error creating comment");
                } else {
                    //add username and ID to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    //save comment
                    comment.save();
                    //connect new comment to photo
                    photo.comments.push(comment);
                    photo.save();
                    //redirect photo showpage
                    req.flash("succes", "Successfully added comment!");
                    res.redirect("/photos/" + photo._id);
                }
            });
        }
    });
});

//COMMENTS EDIT ROUTE
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, foundComment) {
        if(err){
            res.redirect("back");
        } else {
            res.render("comments/edit", {photo_id: req.params.id, comment: foundComment});
        }
    });
});

//COMMENTS UPDATE
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect("back");
        } else {
            res.redirect("/photos/" + req.params.id);
        }
    });
});

//COMMENT DESTROY ROUTE
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            res.redirect("back");
        } else {
            req.flash("success", "Comment was successfully deleted.");
            res.redirect("/photos/" + req.params.id);
        }
    });
});

module.exports = router;