import Header from "@/features/header/components/header";

export default function RootLayout({
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
