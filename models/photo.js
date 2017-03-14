var mongoose = require("mongoose");

//Schema Setup
var photoSchema = new mongoose.Schema({
    name: String,
    spot: String,
    image: String,
    description: String,
    author: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment"
        }
    ]
});

// var Campground = mongoose.model("Campground", campgroundSchema);

module.exports = mongoose.model("Photo", photoSchema);