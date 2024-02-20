import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const data = await req.json();
  const result = await prisma.todo.create({
    data: {
      text: data.text,
      category: data.category,
      start: data.start,
      end: data.end,
      completed: data.completed,
      id: data.id,
      userId: data.userId,
    },
  });
  return NextResponse.json({ result }, { status: 200 });
};

export const PUT = async (req: NextRequest) => {
  const todo = await req.json();
  const updateTodo = await prisma.todo.update({
    where: {
      id: todo.id,
    },
    data: {
      completed: todo.completed,
    },
  });
  return NextResponse.json({ updateTodo }, { status: 201 });
};
