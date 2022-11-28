const mongoose = require("mongoose")
const {MONGO_URI} = process.env
exports.connectToDb = () =>{
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((conn)=>{
        console.log(`connected to  DB: ${conn.connection.host}`);
    })
    .catch((error)=>{
        console.log(error.message);
        process.exit(1)
    })
}

// after doing changes in the .env file restart the server