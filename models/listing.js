//DATABASE SCHEMA

const mongoose = require("mongoose"); // include mongoose for db connectivity
const Schema = mongoose.Schema; // include for desining the schemas 
const Review = require("./review.js");
const { listingSchema } = require("../schema");

// creating listing schema
const ListingSchema = new Schema({  //ListingSchema is userdefined
    title:{
        type:String,
        required:true,  //property of schema
    },
    description:String,
    image:{
        url:String,
        filename:String,
    },
    price:Number,
    location:String,
    country:String,
    review:[
        {
        type:Schema.Types.ObjectId,
        ref:"Review"
        },
    ]   ,
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    }
});

ListingSchema.post("findOneAndDelete",async (listing) => {  // middleware function it trigger when any listing delete
    if(listing){
        await Review.deleteMany({_id:{$in:listing.review}});
    }
})

const Listing = mongoose.model("Listing",ListingSchema);    // creating models
module.exports = Listing;   // export the Listing (require by app.js etc.)