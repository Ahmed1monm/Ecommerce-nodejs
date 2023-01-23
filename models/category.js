const mongoose = require('mongoose');


// Create schema
const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3,"Category name is too short"],
        maxLength: [32,"Category name is too Long"],

        unique: [true, "Category name must be unique"],
        required: [true, "Category name is required"]

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
const CategoryModel = new mongoose.model('Category', CategorySchema);

module.exports = CategoryModel;