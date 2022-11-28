const mongoose = require("mongoose");
import TodoModel from "../models/Todos";

export async function createTaskTodoController (req, res){
    const id = req.params.id
    const todo = await TodoModel.findById(id)
    const {task} = req.body
    todo.tasks.push(task) 
    await todo.save()
    res.status(201).json(todo)
}