"use client";

import axios from "axios";
import { SERVER_API } from "../../../../../../config";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUserStore } from "@/store";
import callManager from "@/hooks/callManager";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function UpdateUserPage() {
  const { call } = callManager();
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });
  const { userId } = useParams<{ userId: string }>();

  async function loadOneUser() {
    const response = await call(
      axios.get(SERVER_API + `/admin/dashboard/users/${userId}`),
      false
    );
    const matchedUser = response.data.data;
    setFormData({
      ...formData,
      name: matchedUser.name,
      email: matchedUser.email,
    });
  }
  useEffect(() => {
    loadOneUser();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.put(SERVER_API + `/admin/dashboard/users/${userId}`, formData),
      true
    );
    loadOneUser();
  };

  return (
    <div>
      <h1>مشاهده یک کاربر</h1>
      <div className="my-form my-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col gap-3 justify-center align-middle shadow-md p-3 rounded"
        >
          <input
            type="text"
            className="border rounded p-3"
            placeholder="name"
            name="name"
            value={formData?.name}
            onChange={handleChange}
          />
          <input
            type="text"
            className="border rounded p-3"
            placeholder="email"
            name="email"
            value={formData?.email}
            onChange={handleChange}
          />
          <button>بروزرسانی</button>
        </form>
      </div>
    </div>
  );
}
