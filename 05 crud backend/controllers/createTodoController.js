const TodoModel = require("../models/Todos");

export async function createTodoController(req, res) {
  try {
    if(!(req.body.title)){
        res.status(401).send("title is required")
    }
    const todo = new TodoModel({
      title: req.body.title,
    });
    const createdNewTodo = await todo.save();
    res.status(201).json(createdNewTodo);
  } catch (error) {}
}


