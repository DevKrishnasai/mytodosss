import Loading from "@/components/Loading";
import { ClerkLoaded, ClerkLoading, SignIn } from "@clerk/nextjs";

export default function Page() {
  console.log(ClerkLoading);
  return (
    <div className="h-screen flex justify-center items-center">
      <ClerkLoading>
        <Loading />
      </ClerkLoading>
      <ClerkLoaded>
        <SignIn />
      </ClerkLoaded>
    </div>
  );
}
