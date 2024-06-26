"use client";
import { getTodos } from "@/server/todo.action";
import { useQuery } from "@tanstack/react-query";

const useTodoQuery = () => {
  const {
    data,
    error,
    isPending: todosLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: async () => {
      const res = await getTodos();
      return res;
    },
  });

  return { data, error, todosLoading };
};

export default useTodoQuery;
