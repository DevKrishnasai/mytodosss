import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const POST = async (req: NextRequest, res: NextResponse) => {
  const user = await req.json();
  const data = await prisma.user.findFirst({
    where: {
      id: user.userId,
    },
  });
  data?.categories.push(user.category);

  const categories = await prisma.user.update({
    select: {
      categories: true,
    },
    where: {
      id: user.userId,
    },
    data: {
      categories: data?.categories,
    },
  });
  return NextResponse.json({ categories }, { status: 200 });
};
