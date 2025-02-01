// user authentication schema
const mongoose = require("mongoose"); // include mongoose for db connectivity
const Schema = mongoose.Schema; // include for desining the schemas 
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email:{         // no need to make username and password inside schema passport-local-mongoose automatically take
        type:String,
        required:true,
    },
});

userSchema.plugin(passportLocalMongoose); // used for automatically hashing and salting
module.exports = mongoose.model("User",userSchema);;