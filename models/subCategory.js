const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema(
    {
        name: {
            type: String ,
            trim: true,
            maxlingth: [32, "Name is Too long"],
            minlignth: [2, "Name is Too short"],    
            unique: true
        },
        slug: {
            type: String,
            lowerCase: true
        },
        category: {
            type: mongoose.Schema.ObjectId,
            ref: 'Category',
            required: [true, "subCategory not added to any Category"]
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("subCategory",subCategorySchema);