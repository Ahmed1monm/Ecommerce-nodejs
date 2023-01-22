const globalErrorHandeller = (err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "Failed"
    res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack
    })
}

module.exports = globalErrorHandeller