// connecting with database with the help of mongoose

const mongoose = require("mongoose")

const {MONGO_URL} = process.env

mongoose.connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(console.log("DB connection success"))
.then(error=>{
    console.log("db failed");
    console.log(error);
})