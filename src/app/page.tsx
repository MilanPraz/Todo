import TodoForm from "@/components/Todo/TodoForm";

import toast, { Toaster } from "react-hot-toast";

export default function Home() {
  return (
    <main className="   mx-auto justify-center  bg-background   max-w-xl ">
      <div className="  mt-8  ">
        <TodoForm />
        <Toaster />
      </div>
    </main>
  );
}
