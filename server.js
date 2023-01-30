const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const dbConnection = require('./config/database');
const CategoryRoutes = require("./routes/categoryRouts");
const SubCategoryRoutes = require("./routes/subCategoryRouts");
const BrandRoutes = require("./routes/brandRouts");
const ProductRoutes = require('./routes/productRouters');


const ApiError = require('./utils/ApiError'); 
const globalErrorHandeller = require('./middlewares/globalErrorHandeller');


dotenv.config({path:'config.env'});


// express app
const app = express();


// connect database
dbConnection();


// Middleware
app.use(express.json());

if(process.env.MODE_ENV === "development"){
    app.use(morgan('dev'));
    console.log(`mode: ${ process.env.MODE_ENV }`);
    // process.exit(1);
}

//Mount routes
app.use('/api/v1/categories', CategoryRoutes);
app.use('/api/v1/sub-categories', SubCategoryRoutes);
app.use('/api/v1/brands', BrandRoutes);
app.use('/api/v1/products', ProductRoutes);



app.all("*",(req,res,next)=>{

    //error = new Error(`Can't find this route ${req.originalUrl}`);
   const error = new ApiError(`Can't find this route ${req.originalUrl}`, 404);
    next(error);
})

// Global Error Handling Middleware for express
app.use(globalErrorHandeller);


// listen
const {PORT} = process.env;
const server = app.listen(PORT,()=>{
    console.log(`PORT ${  PORT}`);   
})

// Event => Listen => callback(err)
// Handling rejections outside express
process.on('unhandledRejection',(err)=>{    
   
    console.log(`====>>     UnhandledRejection error: ${err}      <<=====`);
    server.close(()=>{
        console.log("Shutdown server");
        process.exit(1);
    })
   
})