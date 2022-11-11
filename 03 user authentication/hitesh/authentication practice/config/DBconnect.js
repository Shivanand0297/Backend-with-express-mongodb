const mongoose = require("mongoose")

const MONGO_URL = "bla bla";

exports.DBconnect = () =>{
    mongoose.connect(MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(console.log("connected to database"))
    .catch((error)=>{
        console.log(error);
        console.log("database connection failed");
        // if connection failed exit the process
        process.exit(1)
    })
}



// practice

/* const mongoose = require("mongoose");
const MONGO_URL = "somthing"
exports.dbConnect = () =>{
    mongoose.connect(MONGO_URL, {
        useNewUrlParser: true, 
        useUnifiedTopology: true
    })
    .then(console.log("connected to db"))
    .catch((error)=>{
        console.log(error);
        process.exit(1)
    })
} */