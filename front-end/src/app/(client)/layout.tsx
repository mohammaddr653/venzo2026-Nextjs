import ClientBootstrap from "@/components/clientBootstrap";
import GoUp from "@/components/goUp";
import Footer from "@/features/footer/components/footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {children}
      <Footer></Footer>
      <ClientBootstrap></ClientBootstrap>
      <GoUp></GoUp>
    </>
  );
}
