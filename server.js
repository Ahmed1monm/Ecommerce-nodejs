const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const dbConnection = require('./config/database');
const routes = require("./routes/categoryRouts")

dotenv.config({path:'config.env'});


// express app
const app = express();


// connect database
dbConnection();


// Middleware
app.use(express.json());

if(process.env.MODE_ENV == "development"){
    app.use(morgan('dev'));
    console.log(`mode: ${ process.env.MODE_ENV }`);
    // process.exit(1);
}

//Mount routes
app.use('/api/v1/categories', routes);

// listen
const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("PORT " + PORT);   
})