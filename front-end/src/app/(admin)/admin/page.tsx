"use client"
import callManager from "@/hooks/callManager";
import useLoadUser from "@/hooks/useLoadUser";
import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_API } from "../../../../config";
import Link from "next/link";
import AvatarSelector from "@/features/admin/components/avatarSelector";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function AdminPage() {
  const { call } = callManager();
  const { user, getAuthedUser } = useLoadUser();
  const [formData, setFormData] = useState({
    name: "",
  });

  function refresh() {
    setFormData({
      name: user ? user.name : "",
    });
  }

  useEffect(() => {
    refresh();
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Append all form fields to FormData
    const response = await call(
      axios.put(SERVER_API + "/user/dashboard", formData),
      true
    );
    getAuthedUser();
  };

  return (
    <div>
      <h1 className="bg-blue-300">hello admin</h1>
      <h1>{user?.name}</h1>
      <h1>{user?.email}</h1>
      <h1>{user?.isadmin ? "is admin" : "not admin"}</h1>
      <h1>admin page</h1>
      <AvatarSelector user={user}></AvatarSelector>
      <div className="bg-green-300">
        <h1>ویرایش اکانت</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            name="name"
            value={formData.name}
            className="border"
            onChange={handleChange}
          />
          <br />
          <button>ثبت تغییرات</button>
        </form>
      </div>
      <div className="bg-gray-300 flex">
        <Link href={"/admin/users"}>مدیریت کاربران</Link>
        <Link href={"/admin/medias"}>کتابخانه</Link>
        <Link href={"/admin/categories"}>مدیریت دسته بندی ها</Link>
        <Link href={"/admin/products"}>مدیریت محصولات</Link>
        <Link href={"/admin/properties"}>مدیریت ویژگی ها</Link>
        <Link href={"/admin/orders"}>مدیریت سفارش ها</Link>
        {/* <Link href={"/admin/blogs"}>مدیریت مقالات</Link> */}
      </div>
      <br />
      <h3>پیکره بندی صفحه</h3>
      <Link href={"/admin/page/banners"}>مدیریت بنر ها</Link>
      <Link href={"/admin/page/trusts"}>مدیریت اعتماد ها</Link>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
}
