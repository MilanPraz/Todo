import TodoForm from "@/components/Todo/TodoForm";

import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className=" flex  mx-auto justify-center  bg-background h-[100vh]">
      <div className=" flex flex-col mt-8">
        <p className=" text-4xl text-center font-bold text-primary-foreground">
          Todo App
        </p>
        <TodoForm />
        <Toaster />
      </div>
    </main>
  );
}
