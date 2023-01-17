const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({path:'config.env'});



const app = express();

mongoose.connect(process.env.DATABASE_CONNECTION_STRING).then((conn)=>{
    console.log(`Database connected at ${conn.connection.host}`);
}).catch((err)=>{
    console.log(`database error ${err}`);
});

if(process.env.MODE_ENV == "development"){
    app.use(morgan('dev'));
    console.log(`mode: ${ process.env.MODE_ENV }`);
    // process.exit(1);
}

app.get("/",(req,res)=>{
    res.send("Hello, World");
})

 const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log("PORT " + PORT);   
})