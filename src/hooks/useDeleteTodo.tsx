"use client";

import { BASE_API_URL } from "@/lib/constants";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useDeleteTodo() {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: async (todoId) => {
      const response = await axios.delete(`${BASE_API_URL}/api/todo/${todoId}`);

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
