"use client";
import axios from "axios";
import { SERVER_API } from "../../../../config";
import { useEffect, useState } from "react";
import callManager from "@/hooks/callManager";
import useLoadUser from "@/hooks/useLoadUser";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function VerifyPage() {
  const { user } = useLoadUser();
  const { call } = callManager();
  const [formData, setFormData] = useState({
    code: "",
  });
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await call(
      axios.post(SERVER_API + "/verify", formData),
      true
    );
    if (response && response.status === 200) {
      window.location.reload();
    }
  };

  useEffect(() => {
    sendCode();
  }, []);

  async function sendCode() {
    const response = await call(axios.get(SERVER_API + "/verify"), false);
  }

  return (
    <>
      <main>
        <div className="verifypage-container flex flex-col gap-10 pb-20 pt-20">
          <h1>verify page</h1>
          <p>
            برای استفاده از امکانات حساب کاربری لطفا ایمیل خود را تایید کنید
          </p>
          <p>
            <span>ما به</span>
            <span>{user?.email}</span>
            <span>
              ایمیلی فرستادیم . لطفا آن را تایید کنید سپس صفحه را مجددا بلرگزاری
              کنید
            </span>
          </p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="code"
              className="border"
              onChange={handleChange}
            />
            <button>تایید</button>
          </form>

          <div className="bg-sky-600">this is tailwind</div>
          <div className="bg-sky-300">
            this is zustand , hello{user ? user.name : " user"}
          </div>
        </div>
      </main>
    </>
  );
}
