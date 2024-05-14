import Todo from "@/database/todo.model";
import { connectdb } from "@/lib/connectdb";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  connectdb();

  const todos = await Todo.find({});

  return NextResponse.json({
    status: 200,
    data: todos,
  });
}

export async function POST(req: NextRequest) {
  connectdb();

  try {
    const body = req.body;
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        error: "Error creating task",
      },
      {
        status: 400,
      }
    );
  }
}
