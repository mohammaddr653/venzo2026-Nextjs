"use client";
import callManager from "@/hooks/callManager";
import useLoadUser from "@/hooks/useLoadUser";
import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_API } from "../../../../config";
import TitleRight from "@/components/title-right";

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
      <TitleRight title="داشبورد" className={"text-wrap"}></TitleRight>
      <div className="bg-green-200 flex flex-col gap-2">
        <h2>ویرایش مشخصات</h2>
        <form onSubmit={handleSubmit}>
          <label htmlFor="user-name">
            <p>نام</p>
            <input
              id="user-name"
              type="text"
              placeholder="name"
              name="name"
              value={formData.name}
              className="border"
              onChange={handleChange}
            />
          </label>
          <br />
          <button>ثبت تغییرات</button>
        </form>
      </div>
    </div>
  );
}
