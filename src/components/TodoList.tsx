"use client";

import useDeleteTodo from "@/hooks/useDeleteTodo";
import useTodoList from "@/hooks/useTodoList";
import { getDate } from "@/lib/utils";
import React, { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import TodoModal from "./TodoModal";

interface Todo {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  updated_at: string;
  created_at: string;
}

export default function TodoList() {
  const { todos, isLoading, isError } = useTodoList();
  const { deleteTodoMutation } = useDeleteTodo();

  if (isLoading) return <div className="animate-spin"></div>;
  if (isError) return <div>err</div>;

  return (
    <div className="mt-5">
      {todos.map((todo: Todo) => {
        // console.log(todo);

        return (
          <TodoItem
            key={todo._id}
            todo={todo}
            deleteTodoMutation={deleteTodoMutation}
          />
        );
      })}
    </div>
  );
}

interface TodoItemProps {
  todo: {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    created_at: string;
    updated_at: string;
  };
  deleteTodoMutation: any;
}

function TodoItem({ todo, deleteTodoMutation }: TodoItemProps) {
  const { _id, title, description, completed, created_at, updated_at } = todo;
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`border-2 ${
        completed ? "border-green-600" : "border-red-800"
      } rounded p-2 my-3 w-[800px]`}
    >
      <div className="flex gap-3 justify-between">
        <div>
          <p className={`font-bold ${completed ? "line-through" : ""}`}>
            {title}
          </p>
          <p>{description}</p>
        </div>
        <div className="flex gap-2">
          <div
            className="p-1 bg-slate-400 h-7 rounded"
            onClick={() => setOpen(true)}
          >
            <FiEdit2 className=" cursor-pointer" size={18} />
          </div>
          <TodoModal open={open} setOpen={setOpen} todo={todo} />
          <div
            className="p-1 bg-slate-400 h-7 rounded"
            onClick={() => deleteTodoMutation.mutate(_id)}
          >
            <MdDeleteOutline className="cursor-pointer" size={18} />
          </div>
        </div>
      </div>
      <div className="text-sm my-3 flex flex-col items-end">
        <p>Created at: {getDate(created_at)}</p>
        {getDate(created_at) !== getDate(updated_at) && (
          <p>Updated at: {getDate(updated_at)}</p>
        )}
      </div>
    </div>
  );
}
