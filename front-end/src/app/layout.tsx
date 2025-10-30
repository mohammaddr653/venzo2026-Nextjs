import "../assets/css/globals.css";
import { Toaster } from "sonner";
import { iransans } from "./fonts";
import ClientBootstrap from "@/components/clientBootstrap";
import GoUp from "@/components/goUp";
import Footer from "@/features/footer/components/footer";

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
        <Footer></Footer>
        <ClientBootstrap></ClientBootstrap>
        <Toaster position="top-right" />
        <GoUp></GoUp>
      </body>
    </html>
  );
}
