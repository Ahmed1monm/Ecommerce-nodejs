const CategoryModel = require('../models/category');
const slugify = require('slugify')

exports.createCategory =  (req,res)=>{
    const name = req.body.name
    CategoryModel.create({name, slug:slugify(name)})
    .then((category)=> res.status(201).json({data: category}))
    .catch((error)=> res.send(error));
}