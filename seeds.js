var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Jaro's Camp",
        image: "https://instagram.ford1-1.fna.fbcdn.net/t51.2885-15/e35/16788680_1168428623262342_7515921832873033728_n.jpg",
        description: "How many of us?" 
    },
    {
        name: "Cat's Camp",
        image: "https://instagram.ford1-1.fna.fbcdn.net/t51.2885-15/e35/16906099_1568586263171509_6519018094784937984_n.jpg",
        description: "Not many of us" 
    },
    {
        name: "Thea's Camp",
        image: "https://instagram.ford1-1.fna.fbcdn.net/t51.2885-15/e35/16788431_275932999508685_5928752170835902464_n.jpg",
        description: "watches black mirror once" 
    }
]

function seedDB(){
    // Remove all campgrounds
    Campground.remove({}, function(err){
        if(err){
            console.log("Error removing campgrounds!");
        }
        console.log("Removed campgrounds!");
    });
    // Add a few campgrounds
    data.forEach(function(seed){
        Campground.create(seed, function(err, campground){
            if(err){
                console.log("Error creating seed campground");
            } else {
                console.log("Added new campground");
                // Add a few comments
                Comment.create({
                    text: "Where the fam at tho?",
                    author: "Other jaro"
                }, function(err, comment){
                    if(err){
                        console.log("Error making comment");
                    } else {
                        campground.comments.push(comment);
                        campground.save();
                        console.log("Created new comment");
                    }
                });
            }
        });
    });
}

module.exports = seedDB;