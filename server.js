const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
dotenv.config({path: 'config.env'});

const app = express();

if(process.env.MODE_ENV == "development"){
    app.use(morgan('dev'));
    console.log(`mode: ${ process.env.MODE_ENV }`);
}

app.get("/",(req,res)=>{
    res.send("Hello, World");
})

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("PORT " + PORT);   
})