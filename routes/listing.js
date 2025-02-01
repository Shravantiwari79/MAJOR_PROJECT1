// Only for listing routes

const express = require("express");
const router = express.Router();    // require router for organize the our code
const wrapAsync = require("../utils/wrapAsync.js");  // for handling async error
const Listing = require("../models/listing.js") // include Listing Schema from models->listing.js
const {isLoggedIn,isOwner} = require("../middleware.js");
const {validateListing} = require("../middleware.js");

const listingController = require("../controllers/listings.js");
const multer  = require('multer')   // for parsing the form deta
const {storage} = require("../cloudConfig.js"); // require cloudinary storage
const upload = multer({storage }) //  fetch file from form and save inside storage folder

//using router.route for same route request
router.route("/")
    .get(wrapAsync(listingController.index))  // show all listings (index route)
    .post(isLoggedIn,
        //validateListing,
        upload.single('listing[image]'),wrapAsync(listingController.createListing)) // Create new listing post request form new.ejs 

// Create new listings  route get request  
//(index.ejs)--GET-->("/listings/new")-->(new.ejs)--POST-->("/listings")-->redirect("/listings")

router.get("/new",isLoggedIn,listingController.renderForm);

router.route("/:id")
    .put(isLoggedIn,isOwner,
        upload.single('listing[image]'),
        validateListing,
        wrapAsync(listingController.updateListings))    //UPDATE route
    .delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing))  //DELETE route
    .get(wrapAsync(listingController.showListings)); // Show route (individual route by id)


// EDIT route, take get request from  show.ejs(throw anchor tag)
// (show.ejs)--GET(anchor tag)-->("/listings/:id/new")-->(edit.ejs)--PUT(use method override)-->(/listings/:id)-->redirect on listings
router.get("/:id/new",isLoggedIn,isOwner,wrapAsync(listingController.renderEditForm));

// .populate() use for fetch whole data from one to many relationships

module.exports = router;    // exports router so that build a connection with app.js require by app.js