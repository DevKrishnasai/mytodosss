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
  console.log(result);
  return NextResponse.json({ result }, { status: 200 });
};

export const GET = async (req: NextRequest) => {
  // const data = await req.json();

  const todos = await prisma.todo.findMany();
  console.log(todos);
  return NextResponse.json({ todos }, { status: 200 });
};
