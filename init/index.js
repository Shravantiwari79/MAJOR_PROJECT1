// Logic for data initialization

const mongoose = require("mongoose");
const initData =require("./data.js");
const Listing = require("../models/listing.js");

const MONGO_URL = 'mongodb://127.0.0.1:27017/Wonderlust'; 

//error handling if occurs (when we make connection with database)
main().
    then(()=>{
        console.log("connected to DB"); // connect successfully with db
    })      
    .catch((err)=>{
        console.log(err);   // when occurs any problems with database connection 
    })
    
// Database connection async function
async function main(){
   await mongoose.connect(MONGO_URL);
}

// data insert in database after cleaning privious data
const initDB = async ()=>{
    await Listing.deleteMany({});   //clean listings
    initData.data = initData.data.map((obj)=> ({...obj, owner:"679bbaee82e50f4f0e795679"}));    // for adding owner in database we use map
    await Listing.insertMany(initData.data);    //inser data from initData.data init data require from data.js
    console.log("data was initialized");
};
initDB();