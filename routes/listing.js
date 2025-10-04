const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing} = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage});

router
.route("/")
//index route
.get(wrapAsync(listingController.index))
.post(
   isLoggedIn,
   // validateListing,
   upload.single("image"),
   //  validateListing,
      wrapAsync(listingController.createListing)
);


//New route
router.get("/new",isLoggedIn, listingController.renderNewForm);


//show route
router.route("/:id")
.get(wrapAsync(listingController.showListing))
//update raute
.put(
   isLoggedIn,
   isOwner,
   upload.single("image"),
   validateListing,
    wrapAsync(listingController.updateListing))

   //DELETE ROUTE
.delete(
   isLoggedIn,
    isOwner,
   wrapAsync(listingController.destroyeListing));


//edit route
router.get("/:id/edit",
   isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm));
module.exports = router;