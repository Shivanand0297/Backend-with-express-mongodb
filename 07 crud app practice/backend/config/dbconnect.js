const mongoose = require("mongoose")
const {MONGO_URL} = process.env
exports.dbConnect = () =>{
    mongoose.connect(MONGO_URL, {
        useUnifiedTopology: true, 
        useNewUrlParser: true
    }).then((conn)=>{
        console.log(`Connected to database at ${conn.connection.host}`);
    }).catch((err)=>{
        console.log(err.message);
        process.exit(1);
    })
}