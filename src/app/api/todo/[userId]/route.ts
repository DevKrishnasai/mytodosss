import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const user = params.userId;
  const todos = await prisma.user.findUnique({
    where: {
      id: user,
    },
    select: {
      todos: true,
    },
  });

  return NextResponse.json({ todos }, { status: 200 });
};
