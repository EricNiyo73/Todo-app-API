import { Router, Request, Response } from "express";
import bodyParser from "body-parser";
import Todo, { TodoDocument } from "../Models/todoModel";
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
      email: req.user.email,
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
  } catch (error) {
    return res.status(500).json(error);
  }
};

//DELETE Todo
export const deleteT = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) {
      return res.status(400).json({
        status: "failed",
        message: "Id of a todo not found",
      });
    }
    return res.status(204).json({
      status: "success",
      message: "Todo deleted ............",
    });
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
    const posts = await Todo.find();

    return res.status(200).json({
      data: posts,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};
