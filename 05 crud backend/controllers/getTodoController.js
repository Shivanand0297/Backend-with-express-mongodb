const mongoose = require("mongoose");
import TodoModel from "../models/Todos";

export async function getTodoController (req, res){
    try {
        const id = req.params.id
        const todo = await TodoModel.findById(id)
        res.json(todo)
    } catch (error) {
        
    }
}