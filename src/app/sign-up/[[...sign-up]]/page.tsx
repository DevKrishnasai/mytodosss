import Loading from "@/components/Loading";
import { SignUp, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";

export default function Page() {
  console.log(ClerkLoading);
  return (
    <div className="h-screen flex justify-center items-center">
      <ClerkLoading>
        <Loading />
      </ClerkLoading>
      <ClerkLoaded>
        <SignUp />
      </ClerkLoaded>
    </div>
  );
}
