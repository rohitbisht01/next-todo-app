"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useDeleteTodo() {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: async (todoId) => {
      const response = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/todo/${todoId}`
        // `http://localhost:3000/api/todo/${todoId}`
      );

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["todo-list"],
      });
    },
  });

  return { deleteTodoMutation };
}
