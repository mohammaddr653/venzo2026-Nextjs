"use client";
import axios from "axios";
import { SERVER_API } from "../../../../config";
import { useState } from "react";
import useLoadUser from "@/hooks/useLoadUser";
import callManager from "@/hooks/callManager";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function PassRestorePage() {
  const { user } = useLoadUser();
  const { call } = callManager();
  const [formData, setFormData] = useState({
    email: "",
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
      axios.post(SERVER_API + "/pass-restore", formData),
      true
    );
  };

  return (
    <>
      <main>
        <div className="passrestore-page-container flex flex-col gap-10 pb-20 pt-20">
          <h1>pass restore page</h1>
          <p>لطفا ایمیل خود را وارد کنید</p>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
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
