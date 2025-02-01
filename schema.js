// for schema validation (its use for server side validation means when user access website direct throw apis then its work )
// JOI npm package

// Listing Schema validation
const joi = require("joi");
module.exports.listingSchema = joi.object({
    listing: joi.object({
        title: joi.string().required(),
        description: joi.string().required(),
        location: joi.string().required(),
        country: joi.string().required(),
        price: joi.number().required().min(0),
        image: joi.string().allow("",null),

    }).required(),
});

// Review schema validation
module.exports.reviewSchema = joi.object({
    review:joi.object({
        rating: joi.number().required().min(1).max(5),
        comment: joi.string().required(),
    }).required(),
})