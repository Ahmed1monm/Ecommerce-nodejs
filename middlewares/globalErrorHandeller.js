const globalErrorHandeller = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Failed"
    if(process.env.MODE_ENV == "development" ){
         developmentError (err,res);
    }else{
        productionError(err,res);
    }
    
}

const developmentError = (err,res)=>{
    return  res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    });
}

const productionError = (err,res)=>{
    return  res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
       
    });
}

module.exports = globalErrorHandeller