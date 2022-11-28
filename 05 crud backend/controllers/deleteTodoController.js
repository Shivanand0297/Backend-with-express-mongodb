const mongoose = require("mongoose");
import TodoModel from "../models/Todos";

export async function deleteTodoController (req, res){
    try {
        const id = req.params.id
        const deletedTodo = await TodoModel.findByIdAndDelete(id)
        res.json(deletedTodo)
    } catch (error) {
        
    }
}