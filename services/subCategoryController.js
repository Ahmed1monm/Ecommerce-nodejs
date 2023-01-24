const slugify = require('slugify');
const asyncHandler = require('express-async-handler');
const SubCategoryModel = require('../models/subCategory');
const ApiError = require('../utils/ApiError');



exports.setCategoryIdToBody = (req,res,next)=>
{
    if (!req.body.category ) {
        req.body.category = req.params.categoryId;
    }
    next();
}

exports.createSubCategory =  asyncHandler(async (req,res)=>{
    const {name, category} = req.body;
    const subCategory = await SubCategoryModel.create({name, slug:slugify(name), category});
    res.status(201).json({
        "data": subCategory
    });
}
);

exports.getSubCategories =  asyncHandler(async (req,res)=>{
    const page = req.query.page *1 || 1;
    const limit = req.query.limit || 5;
    const skip = (page-1) * limit;
    let filterObject = {};
    if(req.params.categoryId){ // For nasted routes
        filterObject = {category: req.params.categoryId};
        console.log(`filterObject ${filterObject.categoryId}`);
    }
    console.log(req.params);
    const Subcategories = await SubCategoryModel.find(filterObject)
    .skip(skip).limit(limit)
    res.status(200).json({
        "results": Subcategories.length,
        page,
        "data": Subcategories
    });
    
}
);


exports.getSubCategoryByID =  asyncHandler(async (req,res, next)=>{
    const {id} = req.params;
    const subCategory = await SubCategoryModel.findById(id);
    if(!subCategory){
        return  next(new ApiError(`No SubCategory with id ${id}`, 404));
        //res.status(404).json({'msg': `No category with id ${id}`});
    }
    res.status(200).json({'msg':'Success', 'subCategory': subCategory});
    
}
);


exports.updateSubCategory =  asyncHandler(async (req,res, next)=>{
    const {id} = req.params;
    const { name } = req.body;
    const { category } = req.body;
    const subCategory = await SubCategoryModel.findOneAndUpdate({_id:id},{name, slug : slugify(name), category},{new: true});
    if(!category){
        return  next(new ApiError(`No SubCategory with id ${id}`, 404));
    }
    res.status(200).json({'msg':'Success', 'SubCategory': subCategory});
    
}
);


exports.deleteSubCategoryByID =  asyncHandler(async (req,res, next)=>{
    const {id} = req.params;
    const subCategory = await SubCategoryModel.findByIdAndDelete(id);
    if(!subCategory){
        return  next(new ApiError(`No subCategory with id ${id}`, 404));
    }
    res.status(204).send();
    
}
);

