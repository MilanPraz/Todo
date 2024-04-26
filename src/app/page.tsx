import TodoForm from "@/components/Todo/TodoForm";

import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className=" flex  mx-auto justify-center  bg-background h-[100vh]">
      <div className=" flex flex-col mt-8">
        <TodoForm />
        <Toaster />
      </div>
    </main>
  );
}
