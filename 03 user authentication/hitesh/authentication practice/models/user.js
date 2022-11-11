const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
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
    unique: true,
  },
  password: {
    type: String,
  },
  token: {
    type: String,
  },
});

module.exports = mongoose.model("user", userSchema);




// practice

/* import mongoose from "mongoose";
const {Schema} = mongoose;

const UserSchema = new Schema({
  firstname: {
    type: String, 
    required: true
  },
  lastname: {
    type: String, 
  },
  email: {
    type: String, 
    required: true,
    unique: true,

  },
  password: {
    type: String, 
    required: true
  },
  token: {
    type: String, 
  },
});

module.exports = mongoose.model("user", UserSchema) */