const mongoose = require('mongoose');


// Create schema
const CategorySchema = new mongoose.Schema({
    name: String,
});

//Create model
const CategoryModel = new mongoose.model('Categort', CategorySchema);

module.exports = CategoryModel;