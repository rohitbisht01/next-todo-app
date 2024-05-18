"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  updated_at: string;
  created_at: string;
}

export default function useTodoList() {
  const [todos, setTodos] = useState([]);

  const todoQuery = useQuery({
    queryKey: ["todo-list"],
    queryFn: async () => {
      const response = await axios.get("http://localhost:3000/api/todo/");

      setTodos(response.data.data);
      return response;
    },
  });

  return { todos, isLoading: todoQuery.isLoading, isError: todoQuery.isError };
}
