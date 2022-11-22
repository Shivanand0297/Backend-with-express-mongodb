// TODO: 1 how to connect with database, bring mongoose because we are using mongoose to connect with the data base

const mongoose = require("mongoose")
// this connection might be required at the start of the application so we will export this function so that anybody can use this method

const MONGODB_URL = process.env.MONGODB_URL

exports.dbConnect = () =>{
    mongoose.connect(MONGODB_URL, {
        useNewUrlParser: true,
        //useFindAndModify: false, (by default, can skip it)
        useUnifiedTopology: true
          
    })
    .then(console.log("DB connection success"))
    .catch((error)=>{
        console.log("DB connection failed");
        console.log(error);
        // if connection is failed then
        process.exit(1) // to exit with failure code we write 1
    })
        
}

// TODO: config done!, only thing left is to get the MONGODB_URL 
// TODO: now we will work on models

/* or
 const dbConnect = ()=>{

 }
 export default dbConnect */