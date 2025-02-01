const express = require("express");
const router = express.Router({mergeParams:true});  // router({mergeParams:true})-->use to access parent id otherwise show undefined when we create a rebiew
const Review = require("../models/review.js");   // include review Schema from models-->review.js
const wrapAsync = require("../utils/wrapAsync.js");  // for handling async error
const Listing = require("../models/listing.js") // include Listing Schema from models->listing.js
const {validateReview} = require("../middleware.js");
const {isLoggedIn} = require("../middleware.js");
const {isReviewAuthor} = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

// Review POST route
router.post("/",isLoggedIn,validateReview,wrapAsync(reviewController.createReview))

// Review delete route
router.delete("/:reviewId",isLoggedIn,isReviewAuthor,wrapAsync(reviewController.destroyReview));

module.exports = router;