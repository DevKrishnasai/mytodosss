import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export const GET = async (
  req: NextRequest,
  { params }: { params: { userId: string } }
) => {
  const user = params.userId;
  const categories = await prisma.user.findMany({
    select: {
      categories: true,
    },
    where: {
      id: user,
    },
  });
  return NextResponse.json({ categories }, { status: 200 });
};
