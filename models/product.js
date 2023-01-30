const mongoose = require('mongoose');


const ProductSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minLength: [3,"Product name is too short"],
            maxLength: [32,"Product name is too Long"],
    
            unique: [true, "Product name must be unique"],
            required: [true, "Product name is required"]
    
        },
        slug: {
            type: String,
            lowerCase: true
    
        },
        description: {
            type: String,
            minLength: [20,"Product description is too short"],
           
            required: [true, "Product description is required"]
    
        },
        quantity:{
            type: Number,
            required: [true, "Product quantity is required"]
            
        },
        sold:{
            type: Number,
            required: [true, "Product sold quantities is required"]
        },
        price:{
            type: Number,
            required: [true, "Product Price is required"],
            trim: true,
            min:[0, "Enter valid Price"]
        },
        priceAfterDiscount:{
            type: Number,
            required: [true, "Product Price is required"],
            trim: true,
            maxLength:[20, "Enter valid Price"]
        },
        colors:[String],
        images:[String],
        coverImage:{
            type: String,
            required: [true,"Cover Image is required"]
        },
        category:{
            type: mongoose.Schema.ObjectId,
            required: [true, "Product must be in category"],
            ref:'Category'
        },
        subCategory:{
            type: mongoose.Schema.ObjectId,
            ref:'subCategory'
        },
        brand:{
            type: mongoose.Schema.ObjectId,
            ref:'Brand'
        },
        ratingsAverage:{
            type: Number,
            min:[1,"ratings average must be above 1"],
            max:[5,"ratings average must be below 5"],
            default: 0
        },
        ratingsQuantity:{
            type: Number,
            default: 0
        },
    },
    
    {timestamps: true});
    module.exports = mongoose.model("Product",ProductSchema);