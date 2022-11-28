const mongoose = require("mongoose");
import TodoModel from "../models/Todos";

export async function getTodosController(req, res) {
  try {
    const allTodos = await TodoModel.find()
    res.status(201).json(allTodos)
  } catch (error) {}
}
