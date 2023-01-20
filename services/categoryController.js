const CategoryModel = require('../models/category');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')

exports.createCategory =  asyncHandler(async (req,res)=>{
    const name = req.body.name;
    const category = await CategoryModel.create({name, slug:slugify(name)});
    res.status(201).json({
        "data": category
    });
    
}
);

exports.getCategories =  asyncHandler(async (req,res)=>{
    const page = req.query.page *1 || 1;
    const limit = req.query.limit || 5;
    const skip = (page-1) * limit;
    const categories = await CategoryModel.find({}).skip(skip).limit(limit);
    res.status(200).json({
        "results": categories.length,
        page,
        "data": categories
    });
    
}
);


exports.getCategoryByID =  asyncHandler(async (req,res)=>{
    const {id} = req.params;
    const category = await CategoryModel.findById(id);
    if(!category){
        res.status(404).json({'msg': `No category with id ${id}`});
    }
    res.status(200).json({'msg':'Success', 'category': category});
    
}
);