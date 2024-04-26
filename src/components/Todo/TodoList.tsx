"use client";

import { Card, CardHeader, CardTitle } from "@/components/ui/card";

import { DialogTrigger } from "../ui/dialog";
import { X, Pencil, Trash } from "lucide-react";

import {
  EditTitleParameter,
  TodoType,
  setMyTodosFunction,
} from "@/types/todo.type";
import { Skeleton } from "../ui/skeleton";

export function TodoList({
  myTodos,
  handleEdit,
  todosLoading,
  deleteLoading,
  handleDelete,
}: {
  myTodos: TodoType[];
  todosLoading: boolean;
  deleteLoading: boolean;
  handleEdit: (editData: EditTitleParameter) => void;
  handleDelete: (id: number) => void;
}) {
  return (
    <>
      <div className=" flex  flex-col gap-1 items-center">
        <div className="flex flex-col   w-full gap-4">
          {todosLoading && (
            <>
              <div className=" flex flex-col gap-4">
                <Skeleton className=" h-16 w-full" />
                <Skeleton className=" h-16 w-full" />
                <Skeleton className=" h-16 w-full" />
                <Skeleton className=" h-16 w-full" />
              </div>
            </>
          )}
          {myTodos
            ?.filter((todo) => todo.completed === false)
            .map((todo, index) => {
              return (
                <div key={todo._id} className={` `}>
                  <TodoCard
                    deleteLoading={deleteLoading}
                    myTodos={myTodos}
                    todo={todo}
                    handleEdit={handleEdit}
                    handleDelete={handleDelete}
                  />
                </div>
              );
            })}
        </div>
        <h3 className=" text-white text-left self-start my-4 mt-8">
          Completed Task -{" "}
          {myTodos?.filter((todo) => todo.completed === true).length}
        </h3>
        <div className="flex flex-col   w-full gap-4">
          {todosLoading && (
            <>
              <div className=" flex flex-col gap-4">
                <Skeleton className=" h-16 w-full" />
                <Skeleton className=" h-16 w-full" />
                <Skeleton className=" h-16 w-full" />
                <Skeleton className=" h-16 w-full" />
              </div>
            </>
          )}
          {myTodos
            ?.filter((todo) => todo.completed === true)
            .map((todo, index) => {
              return (
                <div key={todo._id} className={` `}>
                  <TodoCard
                    deleteLoading={deleteLoading}
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
  deleteLoading,

  handleDelete,
}: {
  todo: TodoType;
  myTodos: TodoType[];
  deleteLoading: boolean;
  handleEdit: (editData: EditTitleParameter) => void;
  handleDelete: (id: number) => void;
}) {
  return (
    <>
      <Card className=" w-auto">
        <CardHeader className=" flex  gap-2 flex-row justify-between   items-center">
          <div className=" flex  items-center gap-2">
            <CardTitle
              className={` ${todo.completed && " line-through"} flex-grow`}
            >
              {todo.title}
            </CardTitle>
          </div>
          <div className=" flex gap-2 ml-8 items-center">
            <div className=" p-[6px] flex items-center justify-center   rounded-lg">
              <button disabled={deleteLoading} className=" cursor-not-allowed">
                <Trash
                  onClick={() => handleDelete(todo?._id)}
                  className={` h-5 w-5 ${
                    deleteLoading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                />
              </button>
            </div>
            <div className=" p-[6px]   flex items-center justify-center rounded-lg">
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
