import Header from "@/features/header/components/header";

export default function UserRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header focus={true}></Header>
      {children}
    </>
  );
}
