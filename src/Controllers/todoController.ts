import { Request, Response } from "express";
import Todo from "../Models/todoModel";
import User, { UserDocument } from "../Models/userModel";
import { error } from "console";
declare global {
  namespace Express {
    interface Request {
      user?: UserDocument;
    }
  }
}
export default class TodoController {
  //CREATE TODO
  static async createTodo(req: Request, res: Response) {
    const existingTodos = await Todo.findOne({ title: req.body.title });
    if (existingTodos) {
      return res.status(409).json({
        message: "This Todo already exists",
      });
    }
    const newTodo = new Todo({
      postedBy: req.user?._id,
      title: req.body.title,
      desc: req.body.desc,
      completed: req.body.completed,
    });

    const data = await newTodo.save();

    return res.status(201).json({
      data: data,
      message: "your Todo was successfully added",
    });
  }

  //UPDATE TODO
  static async updateTodo(req: Request, res: Response) {
    const TodoId = req.params.id;
    const todo = await Todo.findById(TodoId);

    if (!todo) {
      return res.status(404).json({
        message: "Id of a todo not found",
      });
    }
    const data = await Todo.findByIdAndUpdate(
      { _id: TodoId },
      {
        title: req.body.title,
        desc: req.body.desc,
        completed: req.body.completed,
      },
      { new: true }
    );
    return res.status(200).json({
      data: { data },
      message: "your todo was successfully updated",
    });
  }

  //DELETE Todo
  static async deleteT(req: Request, res: Response) {
    const id = req.params.id;
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({
        message: "Id of a todo not found",
      });
    }
    await Todo.findByIdAndDelete(id);
    return res.status(204).json({
      status: "success",
      message: "Todo deleted ............",
    });
  }
  //delete many
  static async deleteMany(req: Request, res: Response) {
    const data = await Todo.deleteMany();
    return res.status(200).json(data);
  }
  //GET TODO
  static async findOneTodo(req: Request, res: Response) {
    const data = await Todo.findById(req.params.id);
    return res.status(200).json({ data: { data } });
  }

  //GET ALL TODOS
  static async findAllTodo(req: Request, res: Response) {
    const data = await Todo.find();
    return res.status(200).json({
      data: { data },
    });
  }
}
