import RootBootstrap from "@/components/rootBootstrap";
import "../assets/css/globals.css";
import { iransans } from "./fonts";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`bg-white border relative dark:bg-neutral-900 transition-colors duration-300 font-weight200 text-size16 flex flex-col ${iransans.className} max-w-screen mx-auto`}
      >
        {children}
        <Toaster position="top-right" />
        <RootBootstrap></RootBootstrap>
      </body>
    </html>
  );
}
