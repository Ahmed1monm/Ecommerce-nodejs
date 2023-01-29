const mongoose = require('mongoose');


// Create schema
const BrandSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3,"Brand name is too short"],
        maxLength: [32,"Brand name is too Long"],

        unique: [true, "Brand name must be unique"],
        required: [true, "Brand name is required"]

    },
    slug: {
        type: String,
        lowerCase: true

    },
},
{
    timestamps: true
}
);

//Create model
// eslint-disable-next-line new-cap
const BrandModel = new mongoose.model('Brand', BrandSchema);

module.exports = BrandModel;