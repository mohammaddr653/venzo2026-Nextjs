"use client";

import axios from "axios";
import { SERVER_API } from "../../../../../config";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store";
import callManager from "@/hooks/callManager";
import { useRouter } from "next/navigation";
import TitleRight from "@/components/title-right";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function UsersPage() {
  const { call } = callManager();
  const { user } = useUserStore();
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    token: "",
  });

  async function loadUsers() {
    const response = await call(
      axios.get(SERVER_API + "/admin/dashboard/users"),
      false
    );
    setUsers([...response.data.data]);
  }
  useEffect(() => {
    loadUsers();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    userId: any
  ) => {
    const response = await call(
      axios.delete(SERVER_API + `/admin/dashboard/users/${userId}`),
      true
    );
    loadUsers();
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement>,
    userId: any
  ) => {
    router.push(`/admin/update-user/${userId}`);
  };

  const handleRefresh = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      token: "",
    });
    loadUsers();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/users", formData),
      true
    );
    handleRefresh();
  };

  return (
    <div className="flex flex-col gap-5">
      <TitleRight title="مدیریت کاربران" className={"text-wrap"}></TitleRight>
      <div className="flex items-start gap-5">
        <div className="bg-neutral-100 p-2">
          <h1>اضافه کردن کاربر</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              name="name"
              placeholder="name"
              value={formData.name}
              className="border"
              onChange={handleChange}
            />
            <input
              type="text"
              name="email"
              placeholder="email"
              value={formData.email}
              className="border"
              onChange={handleChange}
            />
            <input
              type="text"
              name="password"
              placeholder="password"
              value={formData.password}
              className="border"
              onChange={handleChange}
            />
            <button>ثبت نام</button>
          </form>
        </div>
        <div className="bg-neutral-100 flex flex-col gap-5 p-2 grow">
          <div className="flex justify-between items-center">
            <p>لیست کاربران</p>
          </div>
          <table className="border cu-records-table">
            <thead>
              <tr>
                <th className="border">آیدی</th>
                <th className="border">نام</th>
                <th className="border">ایمیل</th>
                <th className="border">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((user: any, index: any) => {
                return (
                  <tr key={index}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>
                      <button
                        className="bg-red-400 rounded-md p-1"
                        onClick={(e, userId = user._id) => {
                          handleDelete(e, userId);
                        }}
                      >
                        حذف
                      </button>
                      <button
                        className="bg-yellow-400 ms-2 rounded-md p-1"
                        onClick={(e, userId = user._id) => {
                          handleUpdate(e, userId);
                        }}
                      >
                        ویرایش
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
