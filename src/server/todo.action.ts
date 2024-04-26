"use server";

import Todo from "@/models/todo.model";
import { connectDB } from "@/utils/connectdb";
import { EditTitleParameter, TodoType as TodoT } from "../types/todo.type";

export const addTodo = async (data: any) => {
  try {
    const { title } = data;
    await connectDB();
    const mytodo = new Todo({
      title,
      completed: false,
    });
    await mytodo.save();

    return {
      success: true,
      message: "Successfully Created!!",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "failed",
    };
  }
};

export const getTodos = async () => {
  try {
    await connectDB();
    const mytodos = await Todo.find();
    // console.log(mytodos);

    return {
      success: true,
      data: mytodos as TodoT[],
      message: "Successfully Done",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "failed",
    };
  }
};

export const deleteTodo = async (id: number) => {
  try {
    // const { id } = data;
    await connectDB();
    console.log(id);

    const mytodos = await Todo.findByIdAndDelete(id);
    console.log(mytodos);
    console.log("mytodos");

    return {
      success: true,
      data: "Deleted Successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "failed",
    };
  }
};
export const EditTodo = async (formdata: EditTitleParameter) => {
  try {
    const { id, title } = formdata;
    await connectDB();
    // console.log(id);
    // console.log(title);

    const mytodos = await Todo.findByIdAndUpdate(id, { title }, { new: true });
    // console.log(mytodos);
    // console.log("mytodos");

    return {
      success: true,
      data: "Deleted Successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "failed",
    };
  }
};
export const CompleteTodo = async (id: number) => {
  try {
    await connectDB();
    // console.log(id);
    // console.log(title);

    const singleTodo = await Todo.findById(id);
    console.log(singleTodo.completed);

    const mytodos = await Todo.findByIdAndUpdate(
      id,
      {
        completed: !singleTodo.completed,
      },
      { new: true }
    );
    // console.log(mytodos);
    // console.log("mytodos");

    return {
      success: true,
      data: "Updated Successfully",
    };
  } catch (err) {
    console.log(err);
    return {
      success: false,
      message: "failed",
    };
  }
};
