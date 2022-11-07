//creating schema for the users

const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null
    },
    lastname: {
        type: String,
        default: null
    },
    email: {
        type: String, 
        unique: true
    },
    password: {
        type: String, 
        min: 10, 
        max:     10, 
    },
    token: {
        type: String, 
    }
})

module.exports = mongoose.model("user", userSchema)