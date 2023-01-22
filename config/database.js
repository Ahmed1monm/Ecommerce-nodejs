const mongoose = require('mongoose');
const dbConnection = ()=>{
    mongoose.connect(process.env.DATABASE_CONNECTION_STRING).then((conn)=>{
        console.log(`Database connected at ${conn.connection.host}`);
    })
}

module.exports = dbConnection;