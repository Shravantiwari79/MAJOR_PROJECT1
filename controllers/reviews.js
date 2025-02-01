const Listing = require("../models/listing.js");
const Review = require("../models/review.js");

module.exports.createReview = async (req,res)=>{    // /listings/6793c919011cfd127f0e693c/reviews
    let listing = await Listing.findById(req.params.id);    // fetch id 
    let newReview = new Review(req.body.review);    // create new Review require from review.js
     newReview.author = req.user._id;
     console.log(newReview);
    listing.review.push(newReview); // push the review inside the listing.review

    await newReview.save(); // save the new review
    await listing.save();       // save the new listing
    //console.log("new review saved");
    req.flash("success","New Review Created!");
    res.redirect(`/listings/${listing._id}`);
}

module.exports.destroyReview = async (req,res)=>{
    let {id,reviewId} =  req.params;
    await Listing.findByIdAndUpdate(id,{$pull:{review:reviewId}}); // we delete review id from listing using $pull operator
    await Review.findByIdAndDelete(reviewId);   // delete review from Review with the help of review id
    req.flash("success","Review Deleted!");
    res.redirect(`/listings/${id}`);
}