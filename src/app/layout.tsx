import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "./animation.css";
import ContextProvider from "@/providers/ContextProvider";
import { ClerkProvider } from "@clerk/nextjs";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My Todosss",
  description: "simple todo management system",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className="">
        <body className={inter.className}>
          <ContextProvider>
            <div className="relative min-h-screen w-full bg-slate-950 ">
              <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
              {children}
            </div>
          </ContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
