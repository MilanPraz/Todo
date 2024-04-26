"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { TodoList } from "./TodoList";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "@radix-ui/react-label";
import {
  EditTitleParameter,
  FormInput,
  SubmitFormData,
  TodoType,
} from "@/types/todo.type";
import useTodoQuery from "@/hooks/queries";
import {
  useDeleteTodoMutation,
  useEditTodoMutation,
  usePostTodoMutation,
} from "@/hooks/mutations";

import { useForm } from "react-hook-form";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import { zodSchema } from "../schema/todo.schema";
import { Loader } from "../common/Loader";

export default function TodoForm() {
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string | null>(null);

  // Queries
  const { data: allTodos, error } = useTodoQuery();

  // post Mutations
  const { mutate, PostSuccess, PostData, isPending } = usePostTodoMutation();
  console.log(isPending);
  // delete mutation
  const { deleteTodoMutation, deleteResponse } = useDeleteTodoMutation();

  // edit mutation
  const { editTodoMutation, editResponse } = useEditTodoMutation();

  //submit form
  async function FormhandleSubmit(data: z.infer<typeof zodSchema>) {
    console.log(data);
    mutate({
      title: data.title!,
      completed: false,
    });
    if (PostSuccess) {
      reset();
      toast.success("Successfully Added");
    }
  }

  async function handleDelete(id: number) {
    console.log(id);
    const res = deleteTodoMutation(id);
    console.log(res);
    console.log(deleteResponse);
    deleteResponse?.success && toast.error("Successfully Deleted");
  }

  function handleEdit(editData: EditTitleParameter) {
    setEditId(editData.id);
    setEditTitle(editData?.title);
  }

  async function handleEditTitle() {
    const res = editTodoMutation({
      id: editId!,
      title: editTitle!,
    });
    editResponse && toast.success("Edited Successfully!!");
  }

  //reacthook form44
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<FormInput>({
    resolver: zodResolver(zodSchema),
  });

  return (
    <>
      <div className=" mt-4 w-[950px]">
        <form
          onSubmit={handleSubmit(FormhandleSubmit)}
          className=" w-full flex items-center gap-2"
        >
          {/* <div> */}
          <Input
            {...register("title")}
            type="text"
            placeholder="your todo here..."
          />
          <button type="submit" className=" bg-primary p-2 rounded-lg">
            {isPending ? (
              <Loader />
            ) : (
              <Plus type="submit" className=" text-white" />
            )}
          </button>
        </form>
        <div>
          <small className=" text-secondary">{errors?.title?.message}</small>
        </div>
      </div>
      {/* ALL YOUR TODOS */}
      <Dialog>
        <div className={`  mt-8  relative`}>
          <TodoList
            myTodos={allTodos?.data!}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        </div>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Todo</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Your Todo
              </Label>
              <Input
                id="name"
                value={editTitle!}
                onChange={(e) => setEditTitle(e.target.value)}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogTrigger>
              <Button onClick={handleEditTitle} type="submit">
                Save changes
              </Button>
            </DialogTrigger>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
