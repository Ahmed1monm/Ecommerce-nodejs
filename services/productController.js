const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const ProductModel = require('../models/product');
const CategoryModel = require('../models/category');
const SubCategoryModel = require('../models/subCategory');

const ApiError = require('../utils/ApiError');

exports.createProduct =  asyncHandler(async (req,res)=>{
   // req.body.slug = slugify(req.body.name)   
   const category = await CategoryModel.findById(req.body.category);
   const subCategory = await SubCategoryModel.findById(req.body.subCategory);
   if (!subCategory){
    throw new ApiError("subCategory id not found",500);
   }
   if (!category){
    throw new ApiError("Category id not found",500);
   }
   // I don't know why this condition became true whlie the category id and subCategory.category are equall. 
   if(subCategory.category !== category._id){
    console.log(`subcategory: ${subCategory}\n
    category in subcategory: ${subCategory.category} \n
    category id: ${category._id}
    category: ${category}\n
   `)
    throw new ApiError("subCategory is not belong to this category",500);
   }
    const product = await ProductModel.create(req.body);
    res.status(201).json({
        "data": product
    });
}
);

exports.getProducts =  asyncHandler(async (req,res)=>{
    const page = req.query.page *1 || 1;
    const limit = req.query.limit || 5;
    const skip = (page-1) * limit;
    const products = await ProductModel.find({}).skip(skip).limit(limit);
    res.status(200).json({
        "results": products.length,
        page,
        "data": products
    });
}
);


exports.getProductByID =  asyncHandler(async (req,res, next)=>{
    const {id} = req.params;
    const product = await ProductModel.findById(id);
    if(!product){
        return  next(new ApiError(`No product with id ${id}`, 404));
        //res.status(404).json({'msg': `No category with id ${id}`});
    }
    res.status(200).json({'msg':'Success', 'product': product});
}
);

exports.updateProduct =  asyncHandler(async (req,res, next)=>{
    const {id} = req.params;
    req.body.slug = slugify(req.body.name)   
    const category = await CategoryModel.findById(req.body.category);
   const subCategory = await SubCategoryModel.findById(req.body.subCategory);

   if (!category){
    throw new ApiError("Category id not found",500);
   }
   if (!subCategory){
    throw new ApiError("subCategory id not found",500);
   }
   if(subCategory.category !== category){
    throw new ApiError("subCategory is not belong to this category",500);
   }
 
    const product = await ProductModel.findOneAndUpdate({_id:id},req.body,{new: true});
    if(!product){
        return  next(new ApiError(`No product with id ${id}`, 404));
    }
    res.status(200).json({'msg':'Success', 'product': product});
}
);


exports.deleteProductByID =  asyncHandler(async (req,res, next)=>{
    const {id} = req.params;
    const product = await ProductModel.findByIdAndDelete(id);
    if(!product){
        return  next(new ApiError(`No product with id ${id}`, 404));
    }
    res.status(204).send();
}
);