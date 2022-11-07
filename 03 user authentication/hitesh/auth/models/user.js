// TODO: 1 bring mongoose 

const mongoose = require("mongoose")

// TODO: 2 next step is to create a user schema

// option 1
// const {Schema} = mongoose;
// const userSchema = new Schema()

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        default: null,
    },
    lastname: {
        type: String,
        default: null,
    },
    email: {
        type: String,
        required: true,
        // required: [true, "give us the email id"]
        unique: true //the mongoose will automatically looks in the database for unique id and allow only if user id is unique - notice we dont need to learn how to do it by using only mongodb!
    },
    password: {
        type: String
    },
    token: {
        type: String
    }
})

module.exports = mongoose.model("user", userSchema) // in behind the scene  mongodb will automatically pluralize it to users
