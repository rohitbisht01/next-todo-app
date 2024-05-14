import React from "react";
import TodoList from "./TodoList";

export default function Todo() {
  return (
    <div>
      <div>
        <input type="text" placeholder="Enter your todo" />
        <button>Add Todo</button>
      </div>

      <TodoList />
    </div>
  );
}
