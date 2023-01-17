const CategoryModel = require('../models/category');

exports.postCategory =  (req,res)=>{
    const name = req.body.name;

    const newCategory = new CategoryModel({name});

    newCategory.save().then((doc)=>{
        res.json(doc);
    }).catch((err)=>{
        res.json(err);
    });
}