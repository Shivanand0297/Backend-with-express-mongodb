const mongoose = require("mongoose")
const {Schema} = mongoose
const userModel = new Schema({
    name: {
        type: String, 
        required: true,
    },
    email: {
        type: String, 
        required: [true, "please enter the email"], 
        unique: true
    }
})

module.exports = mongoose.model("user", userModel)