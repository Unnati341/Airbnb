const express = require("express");
const router = express.Router({mergeParams: true});
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const Review = require('../models/review.js');
const Listing = require('../models/listing.js');
const {validateReview, isLoggedIn, isReviewAuthor} = require("../middleware.js");
const  reviewController = require("../controllers/reviews.js");

//Reviews
//post Review Route
router.post("/",
  isLoggedIn,
  validateReview, 
  wrapAsync(reviewController.createReview)
);

//Delete Review Raute
router.delete("/:reviewId",
  isLoggedIn,
  isReviewAuthor,
 wrapAsync(reviewController.destroyeReview));

module.exports = router;