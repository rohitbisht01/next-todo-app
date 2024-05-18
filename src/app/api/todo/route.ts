import Todo from "@/database/todo.model";
import { connectdb } from "@/lib/connectdb";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectdb();

    const todos = await Todo.find({});
    const sortedTodos = todos.sort(
      (a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at)
    );

    // console.log(sortedTodos);

    return NextResponse.json({
      data: sortedTodos,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Error",
    });
  }
}

export async function POST(req: Request) {
  try {
    await connectdb();
    const { title, description } = await req.json();

    if (!title || !description) {
      return NextResponse.json({
        error: "Please enter all the required fields",
      });
    }

    const newTodo = await Todo.create({
      title,
      description,
      completed: false,
    });

    return NextResponse.json({
      data: newTodo,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Error creating task",
    });
  }
}
