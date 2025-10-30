import "../assets/css/globals.css";
import { Toaster } from "sonner";
import { iransans } from "./fonts";
import Header from "@/features/header/components/header";
import ClientBootstrap from "@/components/clientBootstrap";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl">
      <body
        className={`bg-white border dark:bg-neutral-900 transition-colors duration-300 font-weight200 text-size16 flex flex-col ${iransans.className} max-w-screen mx-auto`}
      >
        {children}
        <footer className="bg-red-500">footer</footer>
        <ClientBootstrap></ClientBootstrap>
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
