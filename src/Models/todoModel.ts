import mongoose, { Document, Schema } from "mongoose";

export interface Todo {
  postedBy: object;
  title: string;
  desc: string;
  completed: boolean;
}

export interface TodoDocument extends Todo, Document {}

const todoSchema = new Schema<TodoDocument>({
  postedBy: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  desc: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

export default mongoose.model<TodoDocument>("Todo", todoSchema);
