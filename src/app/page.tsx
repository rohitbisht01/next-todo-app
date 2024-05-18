import Todo from "@/components/Todo";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <div className="my-[100px]">
      <h1 className="text-2xl font-bold flex justify-center">
        Manage Your Daily Tasks Here
      </h1>
      <Todo />
      <hr className="mt-4  border-3 border-black" />
      <TodoList />
    </div>
  );
}
