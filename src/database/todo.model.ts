import { Schema, models, model, Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description: string;
  completed: string;
  created_at: Date;
  updated_at: Date;
}

const TodoSchema = new Schema({
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
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const Todo = models.Todo || model("Todo", TodoSchema);

export default Todo;
