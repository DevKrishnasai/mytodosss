import LeftSide from "@/components/LeftSide";
import RightSide from "@/components/RightSide";
import { auth } from "@clerk/nextjs";
import { prisma } from "@/lib/db";

export default async function Home() {
  const { userId } = auth();
  const user = await prisma.user.findMany({
    where: {
      id: userId?.toString(),
    },
  });
  if (user.length === 0 && userId !== undefined) {
    await prisma.user.create({
      data: {
        id: userId!.toString(),
      },
    });
  }
  return (
    <div className="text-white h-screen w-1/2 mx-auto flex justify-center items-center">
      <div className="flex gap-3 w-full max-h-[80vh] ">
        <div className="relative flex flex-col justify-between border-2 rounded p-8 z-0 min-h-fit">
          <LeftSide />
        </div>
        <div className="flex-1 flex flex-col gap-3 z-0 w-full">
          <RightSide />
        </div>
      </div>
    </div>
  );
}
