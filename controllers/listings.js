const Listing = require("../models/listing.js");

module.exports.index = async (req,res)=>{
    const allListings = await Listing.find({}); // Listing.find() is query for fetch all data from DB
    res.render("listings/index.ejs",{allListings});  // render on index.ejs page and show alllistings(allListings received by index.ejs as object )
}

module.exports.renderForm = (req,res)=>{
    res.render("listings/new.ejs"); //  render on listings->new.ejs;
}

module.exports.createListing = async (req,res,next)=>{  // when request come first go for schema validation then next process (validating string is Schema validation function)
    let url = req.file.path;
    let filename = req.file.filename;
   
    let newListing = new Listing(req.body.listing); // insert data into new Listing(Schema) from req.body.listing, which got from new.ejs 
    newListing.owner =  req.user._id;   // for storing current user information
    newListing.image = {url,filename};
    await newListing.save();
    console.log(newListing);
    req.flash("success","New Listing Created-please check it out!");
    res.redirect("/listings");

}

module.exports.renderEditForm = async (req,res)=>{   // its compulsory to check isLoggedIn to be isOwner
    let {id} = req.params;
    const listing = await Listing.findById(id);
    if(!listing){   // if listing does't exist
        req.flash("error","Listing you requested for does not exist!");
        res.redirect("/listings");
    }
    console.log(listing.image.url);
    let originalImageUrl = listing.image.url;
    originalImageUrl.replace("/upload","/upload/e_blur:300");
    console.log(originalImageUrl);
    res.render("listings/edit.ejs" ,{listing,originalImageUrl});
}

module.exports.updateListings = async (req,res)=>{
    let {id} = req.params;  //  take id as parameter 
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing}); // with the help of deconstruction object we find listing information and update it in DB
    if(typeof req.file != "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save();
    }
    req.flash("success","Listing Updated-please check it out!");
    res.redirect(`/listings/${id}`);  // redirect the all listings page
}

module.exports.destroyListing = async (req,res)=>{
    let {id} = req.params;
    const deletedele = await Listing.findByIdAndDelete(id); //delete element on the basis of id
    console.log(deletedele);
    req.flash("success","Listing Deleted!");
    res.redirect("/listings");
}

module.exports.showListings = async (req,res)=>{
    let {id} = req.params;  // take request parameter in id object
    const listing = await Listing.findById(id).populate({path:"review",populate:{path:"author",},}).populate("owner"); // find listing by requested id and store it on listing
    //populate check its argument("review","owner") inside Listing Schema 
    if(!listing){
        req.flash("error","Listing you requested for does not exist!"); // if listing does't exist
        res.redirect("/listings");
    }
    res.render("listings/show.ejs",{listing});  // render on listings->show.ejs and send listing information as object
}