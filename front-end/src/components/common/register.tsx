"use client";

import { useState } from "react";
import { SERVER_API } from "../../../config";
import Link from "next/link";
import axios from "axios";
import LoadingButton from "./loadingButton";
import callManager from "@/hooks/callManager";

const Register = () => {
  const { call, loading } = callManager();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/auth/register", formData),
      true
    );
  };

  return (
    <div className="flex flex-col gap-3 bg-white border p-4 py-5 rounded-md border-neutral-300 w-fit">
      <h1 className="w-full mb-3 font-weight300 text-neutral-800 text-size17">
        ساخت حساب کاربری
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="email"
          placeholder="ایمیل"
          className="border border-neutral-300 rounded-md p-2"
          onChange={handleChange}
        />
        <input
          type="text"
          name="password"
          placeholder="رمز عبور"
          className="border border-neutral-300 rounded-md p-2"
          onChange={handleChange}
        />
        <LoadingButton loading={loading}>ثبت نام</LoadingButton>
      </form>
      <br />
      <Link href={"/auth/login"}>قبلا ثبت نام کرده اید ؟ وارد شوید .</Link>
    </div>
  );
};
export default Register;
