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
  useCompleteTodoMutation,
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
import { Checkbox } from "../ui/checkbox";
import { Skeleton } from "../ui/skeleton";

export default function TodoForm() {
  const [editId, setEditId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const [editInitiate, setEditInitiate] = useState<boolean>(false);

  // Queries
  const { data: allTodos, error, todosLoading } = useTodoQuery();

  // post Mutations
  const { mutateAsync, isPending } = usePostTodoMutation();
  // console.log(isPending);
  // delete mutation
  const { deleteTodoMutation, deleteLoading } = useDeleteTodoMutation();

  // edit mutation
  const { editTodoMutation, editPending } = useEditTodoMutation();

  //submit form
  async function FormhandleSubmit(data: z.infer<typeof zodSchema>) {
    console.log(data);
    let res = await mutateAsync({
      title: data.title!,
      completed: false,
    });
    console.log(res);
    if (res?.success) {
      reset();
      toast.success("Successfully Added");
    }
  }

  async function handleDelete(id: number) {
    console.log(id);
    const res = await deleteTodoMutation(id);
    console.log(res);
    res?.success && toast.success("Successfully Deleted");
  }

  function handleEdit(editData: EditTitleParameter) {
    setEditId(editData.id);
    setEditTitle(editData?.title);
  }

  async function handleEditTitle() {
    const res = await editTodoMutation({
      id: editId!,
      title: editTitle!,
    });
    console.log(res);
    res.success && toast.success("Edited Successfully!!");
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

  const { completeTodoMutation, completeTodoResponse } =
    useCompleteTodoMutation();

  async function handleCheckChange(id: number) {
    const res = await completeTodoMutation(id);
    console.log(res);
  }
  // console.log(editTitle);

  return (
    <>
      <div className=" mt-4  w-full">
        <form
          onSubmit={handleSubmit(FormhandleSubmit)}
          className=" w-full flex items-center gap-2"
        >
          {/* <div> */}
          <Input
            {...register("title")}
            type="text"
            placeholder="Add a new task"
          />
          <button
            disabled={isPending}
            type="submit"
            className=" bg-primary p-2 rounded-lg"
          >
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
      <Dialog open={open} onOpenChange={setOpen}>
        <div className={`  mt-8  relative`}>
          <h3 className=" text-white mb-4">
            Task to do - {allTodos?.data?.length}
          </h3>
          <TodoList
            deleteLoading={deleteLoading}
            todosLoading={todosLoading}
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
            <div className=" items-center ">
              <Label htmlFor="name" className="text-right">
                Your Todo
              </Label>
              <Input
                id="title"
                // {...register("title")}
                value={editTitle!}
                onChange={(e) => {
                  let edit = editTitle !== e.target.value;
                  console.log(edit);
                  if (edit) {
                    setEditInitiate(true);
                  }
                  setEditTitle(e.target.value);
                }}
                className="col-span-3"
              />
            </div>
            <div className="flex items-center gap-4 ">
              <Label>Have you completed?</Label>
              <Checkbox
                className=" bg-white"
                // checked={todo?.completed}
                onCheckedChange={() => handleCheckChange(editId!)}
              />
            </div>
            <div>
              <small className=" text-secondary">
                {errors?.title?.message}
              </small>
            </div>
          </div>
          <DialogFooter>
            <Button
              onClick={async () => {
                await handleEditTitle();
                if (!editPending) {
                  setOpen(false);
                }
              }}
              type="submit"
              className={``}
              disabled={!editInitiate}
            >
              {editPending ? <Loader /> : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
