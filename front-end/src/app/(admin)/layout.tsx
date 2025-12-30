"use client";

import AvatarSelector from "@/components/avatarSelector";
import useLoadUser from "@/hooks/useLoadUser";
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useLoadUser();

  return (
    <main>
      <div className="adminpage-container flex items-stretch h-dvh bg-amber-300">
        <aside className="bg-blue-900 flex flex-col w-50 shrink-0 overflow-y-scroll items-stretch gap-5">
          <div className="flex justify-center p-2">
            <AvatarSelector user={user}></AvatarSelector>
          </div>
          <div className="flex flex-col gap-2 text-white *:hover:bg-blue-950 *:p-2">
            <Link href={"/admin/"}>داشبورد</Link>
            <Link href={"/admin/users"}>مدیریت کاربران</Link>
            <Link href={"/admin/medias"}>کتابخانه</Link>
            <Link href={"/admin/categories"}>مدیریت دسته بندی ها</Link>
            <Link href={"/admin/products"}>مدیریت محصولات</Link>
            <Link href={"/admin/properties"}>مدیریت ویژگی ها</Link>
            <Link href={"/admin/orders"}>مدیریت سفارش ها</Link>
          </div>
        </aside>
        <div className="bg-white grow overflow-y-scroll p-5">{children}</div>
      </div>
    </main>
  );
}
