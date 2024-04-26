import {
  CompleteTodo,
  EditTodo,
  addTodo,
  deleteTodo,
} from "@/server/todo.action";
import { EditFormData, SubmitFormData } from "@/types/todo.type";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostTodoMutation = () => {
  const queryClient = useQueryClient();
  const {
    mutateAsync,
    data: PostData,
    isSuccess: PostSuccess,
    isPending,
  } = useMutation({
    mutationFn: async (formdata: SubmitFormData) => {
      const res = await addTodo(formdata);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  return { mutateAsync, PostData, PostSuccess, isPending };
};

export const useDeleteTodoMutation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: deleteTodoMutation, data: deleteResponse } = useMutation(
    {
      mutationFn: async (id: number) => {
        let res = await deleteTodo(id);
        return res;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
    }
  );
  return { deleteTodoMutation, deleteResponse };
};

export const useEditTodoMutation = () => {
  const queryClient = useQueryClient();

  const {
    mutateAsync: editTodoMutation,
    data: editResponse,
    isPending: editPending,
  } = useMutation({
    mutationFn: async (formdata: EditFormData) => {
      let res = await EditTodo(formdata);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  console.log(editResponse);
  return { editTodoMutation, editResponse, editPending };
};

export const useCompleteTodoMutation = () => {
  const queryClient = useQueryClient();

  const { mutateAsync: completeTodoMutation, data: completeTodoResponse } =
    useMutation({
      mutationFn: async (id: number) => {
        let res = await CompleteTodo(id);
        return res;
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
    });

  return { completeTodoMutation, completeTodoResponse };
};
