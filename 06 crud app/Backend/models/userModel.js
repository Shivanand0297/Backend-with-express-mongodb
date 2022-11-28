const mongoose = require("mongoose")

const {Schema} = mongoose
const userSchema = new Schema({
    name: {
        type: String, 
        required: [true, "Name is required"],
        trim: true,
        maxLength: [25, "name must be 25 character long"] 
    },
    email: {
        type: String, 
        required: [true, "email is required"], 
        unique: true, 
    }
})

module.exports = mongoose.model("User", userSchema)