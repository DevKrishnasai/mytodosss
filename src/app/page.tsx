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
    <div className="text-white min-h-fit h-screen mx-6 flex justify-center items-center">
      {/* <div className="flex flex-col-reverse lg:flex-row gap-3 w-full max-h-[80vh] lg:min-w-[50%] lg:max-w-fit overflow-auto"> */}
      {/* <div className="relative flex flex-col justify-between border-2 rounded p-8 z-0 min-h-fit">
          <LeftSide />
        </div> */}
      <div className=" flex flex-col gap-3 z-0 w-[98%] lg:w-[50%] min-h-fit max-h-[90%]">
        <RightSide />
      </div>
    </div>
    // </div>
  );
}
