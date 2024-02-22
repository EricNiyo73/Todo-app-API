import mongoose, { Document, Schema } from "mongoose";

export interface Todo {
  email: string;
  title: string;
  description: string;
  completed: boolean;
}

export interface TodoDocument extends Todo, Document {}

const todoSchema = new Schema<TodoDocument>({
  email: {
    type: String,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<TodoDocument>("Todo", todoSchema);
