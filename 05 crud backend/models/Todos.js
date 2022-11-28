const mongoose = require("mongoose")
// import mongoose from "mongoose"

const {Schema} = mongoose
const TodoSchema = new Schema({
    title: {
        type: String,
        required: true,
    }, 
    tasks: [String]
})

const TodoModel = mongoose.model("Todo", TodoSchema)
export default TodoModel

// module.exports = mongoose.model("todo", TodoSchema)
