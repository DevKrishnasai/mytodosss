import LeftSide from "@/components/LeftSide";
import RightSide from "@/components/RightSide";

export default function Home() {
  return (
    <div className="text-white h-screen w-1/2 mx-auto flex justify-center items-center">
      <div className="flex gap-3 w-full max-h-[80vh] ">
        <div className="flex flex-col justify-between border-2 rounded p-8 z-0 min-h-fit">
          <LeftSide />
        </div>
        <div className="flex-1 flex flex-col gap-3 z-0 w-full">
          <RightSide />
        </div>
      </div>
    </div>
  );
}
