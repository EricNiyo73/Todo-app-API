import { Request, Response } from "express";
import Todo from "../Models/todoModel";
import User, { UserDocument } from "../Models/userModel";
declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}

//CREATE TODO
export const create = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const existingTodos = await Todo.findOne({ title: req.body.title });
    if (existingTodos) {
      return res.status(409).json({
        message: "This Todo already exists",
      });
    }
    const newTodo = new Todo({
      addedBy: req.user.email,
      title: req.body.title,
      description: req.body.description,
      completed: req.body.completed,
    });

    const saveTodo = await newTodo.save();

    return res.status(201).json({
      saveTodo,
      message: "your Todo was successfully added",
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

//UPDATE TODO
export const updateT = async (req: Request, res: Response) => {
  try {
    const TodoId = req.params.id;
    const todo = await Todo.findById(TodoId);
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    if (!todo) {
      return res.status(400).json({
        status: "failed",
        message: "Id of a todo not found",
      });
    }
    if (todo?.addedBy === req.user.email) {
      const updatedTodo = await Todo.findByIdAndUpdate(
        { _id: TodoId },
        {
          title: req.body.title,
          description: req.body.description,
          completed: req.body.completed,
        },
        { new: true }
      );
      return res.status(200).json({
        updatedTodo,
        message: "your todo was successfully updated",
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "It is not belonged to you",
      });
    }
  } catch (error) {
    return res.status(500).json(error);
  }
};

//DELETE Todo
export const deleteT = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(400).json({
        status: "failed",
        message: "Id of a todo not found",
      });
    }
    if (todo?.addedBy === req.user.email) {
      await Todo.findByIdAndDelete(id);
      return res.status(204).json({
        status: "success",
        message: "Todo deleted ............",
      });
    } else {
      return res.status(400).json({
        status: "failed",
        message: "It is not bellonged to you",
      });
    }
  } catch (err) {
    return res.status(500).json(err);
  }
};

//GET TODO
export const findOneTodo = async (req: Request, res: Response) => {
  try {
    const todo = await Todo.findById(req.params.id);
    return res.status(200).json(todo);
  } catch (err) {
    return res.status(500).json(err);
  }
};

//GET ALL TODOS
export const findAllTodo = async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();

    return res.status(200).json({
      data: todos,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};
