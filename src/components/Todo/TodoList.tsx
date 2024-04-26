"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "../ui/checkbox";
import { DialogTrigger } from "../ui/dialog";
import { X, Pencil, Trash } from "lucide-react";

import {
  EditTitleParameter,
  TodoType,
  setMyTodosFunction,
} from "@/types/todo.type";
import { useCompleteTodoMutation } from "@/hooks/mutations";

export function TodoList({
  myTodos,
  handleEdit,
  handleDelete,
}: {
  myTodos: TodoType[];
  handleEdit: (editData: EditTitleParameter) => void;
  handleDelete: (id: number) => void;
}) {
  return (
    <>
      <div className=" flex  flex-col gap-1 items-center">
        <div className="flex flex-col   w-full gap-4">
          {myTodos?.map((todo, index) => {
            return (
              <div
                key={todo._id}
                className={`${index % 2 == 0 ? "  self-start" : "self-end"}  `}
              >
                <TodoCard
                  myTodos={myTodos}
                  todo={todo}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                />
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export function TodoCard({
  todo,
  myTodos,
  handleEdit,
  handleDelete,
}: {
  todo: TodoType;
  myTodos: TodoType[];
  handleEdit: (editData: EditTitleParameter) => void;
  handleDelete: (id: number) => void;
}) {
  const { completeTodoMutation, completeTodoResponse } =
    useCompleteTodoMutation();

  function handleCheckChange(id: number) {
    const res = completeTodoMutation(id);
  }

  console.log(todo);
  return (
    <>
      <Card className=" w-auto">
        <CardHeader className=" flex  gap-2 flex-row justify-between   items-center">
          <div className=" flex  gap-2">
            <Checkbox
              checked={todo?.completed}
              onCheckedChange={() => handleCheckChange(todo._id)}
            />
            <CardTitle
              className={` ${todo.completed && " line-through"} flex-grow`}
            >
              {todo.title}
            </CardTitle>
          </div>
          <div className=" flex gap-2 ml-8 items-center">
            <div className=" p-[6px] bg-secondary flex items-center justify-center   rounded-lg">
              <Trash
                onClick={() => handleDelete(todo?._id)}
                className=" h-5 w-5  cursor-pointer "
              />
            </div>
            <div className=" p-[6px] bg-primary  flex items-center justify-center rounded-lg">
              <DialogTrigger>
                <Pencil
                  onClick={() =>
                    handleEdit({ id: todo?._id, title: todo?.title })
                  }
                  className=" h-5 w-5  cursor-pointer  "
                />
              </DialogTrigger>
            </div>
          </div>
        </CardHeader>
      </Card>
    </>
  );
}
