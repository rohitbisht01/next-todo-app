"use client";

import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

type NewTodoProps = {
  title: string;
  description: string;
};

export default function Todo() {
  const [task, setTask] = useState<string>("");
  const [description, setDescription] = useState("");

  const queryClient = useQueryClient();

  const taskMutation = useMutation({
    mutationFn: async (newTodo: NewTodoProps) => {
      const response = await axios.post(
        `${process.env.NEXT_BASE_URL}/api/todo/`,
        newTodo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    },
    onSuccess: () => {
      setTask("");
      setDescription("");
      queryClient.invalidateQueries({
        queryKey: ["todo-list"],
      });
    },
    onError: () => {
      console.log("Error creating todo");
    },
  });

  const handleAddTodo = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTodo: NewTodoProps = { title: task, description };
    taskMutation.mutate(newTodo);
  };

  return (
    <div className="py-5 flex justify-center">
      <form onSubmit={handleAddTodo} className="flex flex-col w-96">
        <input
          className="border-black border-2 p-1 my-2 rounded-md "
          type="text"
          placeholder="Enter your todo"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <textarea
          className="border-black border-2 p-1 my-2 rounded-md "
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter your todo description"
        />
        <button className="p-2 bg-slate-500 rounded-md text-white">
          Add Todo
        </button>
      </form>
    </div>
  );
}
