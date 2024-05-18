import Todo from "@/database/todo.model";
import { connectdb } from "@/lib/connectdb";
import { NextResponse } from "next/server";

export async function GET({ params }: { params: { id: string } }) {
  try {
    await connectdb();
    const id = params.id;
    console.log(id);

    const todo = await Todo.findById(id);

    return NextResponse.json({
      data: todo,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Error getting todo",
    });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    await connectdb();
    const id = params.id;
    const { title, description, completed } = await req.json();
    const existingTodo = await Todo.findById(id);

    if (!existingTodo) {
      return NextResponse.json({
        error: "Task not found in db",
      });
    }

    const updatedTodo = await Todo.findByIdAndUpdate(
      {
        _id: id,
      },
      {
        title,
        description,
        completed,
        updated_at: new Date(),
      },
      { new: true }
    );

    return NextResponse.json({
      data: updatedTodo,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Error updating task",
    });
  }
}

export async function DELETE(
  req: Request,
  {
    params,
  }: {
    params: { id: string };
  }
) {
  try {
    await connectdb();
    const { id } = params;

    const deletedTodo = await Todo.findByIdAndDelete(id);
    return NextResponse.json({
      data: deletedTodo,
      message: "Todo deleted",
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      error: "Error deleting todo",
    });
  }
}
