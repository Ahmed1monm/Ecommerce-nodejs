const CategoryModel = require('../models/category');
const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ApiError = require('../utils/ApiError');
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


exports.getCategoryByID =  asyncHandler(async (req,res, next)=>{
    const {id} = req.params;
    const category = await CategoryModel.findById(id);
    if(!category){
        return  next(new ApiError(`No category with id ${id}`, 404));
        //res.status(404).json({'msg': `No category with id ${id}`});
    }
    res.status(200).json({'msg':'Success', 'category': category});
    
}
);

exports.updateCategory =  asyncHandler(async (req,res, next)=>{
    const {id} = req.params;
    const { name } = req.body;
    const category = await CategoryModel.findOneAndUpdate({_id:id},{name, slug : slugify(name)},{new: true});
    if(!category){
        return  next(new ApiError(`No category with id ${id}`, 404));
    }
    res.status(200).json({'msg':'Success', 'category': category});
    
}
);


exports.deleteCategoryByID =  asyncHandler(async (req,res, next)=>{
    const {id} = req.params;
    const category = await CategoryModel.findByIdAndDelete(id);
    if(!category){
        return  next(new ApiError(`No category with id ${id}`, 404));
    }
    res.status(204).send();
    
}
);