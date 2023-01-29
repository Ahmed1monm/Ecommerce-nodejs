const slugify = require('slugify')
const asyncHandler = require('express-async-handler')
const BrandModel = require('../models/brand');
const ApiError = require('../utils/ApiError');

exports.createBrand =  asyncHandler(async (req,res)=>{
    const {name} = req.body;
    const Brand = await BrandModel.create({name, slug:slugify(name)});
    res.status(201).json({
        "data": Brand
    });
    
}
);

exports.getBrands =  asyncHandler(async (req,res)=>{
    const page = req.query.page *1 || 1;
    const limit = req.query.limit || 5;
    const skip = (page-1) * limit;
    const brands = await BrandModel.find({}).skip(skip).limit(limit);
    res.status(200).json({
        "results": brands.length,
        page,
        "data": brands
    });
    
}
);


exports.getBrandByID =  asyncHandler(async (req,res, next)=>{
    const {id} = req.params;
    const brand = await BrandModel.findById(id);
    if(!brand){
        return  next(new ApiError(`No brand with id ${id}`, 404));
        //res.status(404).json({'msg': `No brand with id ${id}`});
    }
    res.status(200).json({'msg':'Success', 'brand': brand});
    
}
);

exports.updateBrand =  asyncHandler(async (req,res, next)=>{
    const {id} = req.params;
    const { name } = req.body;
    const brand = await BrandModel.findOneAndUpdate({_id:id},{name, slug : slugify(name)},{new: true});
    if(!brand){
        return  next(new ApiError(`No brand with id ${id}`, 404));
    }
    res.status(200).json({'msg':'Success', 'brand': brand});
    
}
);


exports.deleteBrandByID =  asyncHandler(async (req,res, next)=>{
    const {id} = req.params;
    const brand = await BrandModel.findByIdAndDelete(id);
    if(!brand){
        return  next(new ApiError(`No brand with id ${id}`, 404));
    }
    res.status(204).send();
    
}
);