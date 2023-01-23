const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const SubCategoryModel = require('../models/subCategory');
//const ApiError = require('../utils/ApiError');


exports.createSubCategory =  asyncHandler(async (req,res)=>{
    const {name, category} = req.body;
    const subCategory = await SubCategoryModel.create({name, slug:slugify(name), category});
    res.status(201).json({
        "data": subCategory
    });
}
);
