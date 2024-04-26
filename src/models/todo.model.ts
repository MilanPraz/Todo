import { Schema, models, model } from "mongoose";

const todoSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Todo = models.Todo || model("Todo", todoSchema);
export default Todo;

// password
// OazOZDYOhXNZInZQ;
