"use client";

import { useState } from "react";
import LoadingButton from "./loadingButton";
import callManager from "../../hooks/callManager";
import axios from "axios";
import { SERVER_API } from "../../../config";
import useLoadUser from "@/hooks/useLoadUser";
import Link from "next/link";
const Login = () => {
  const { call, loading } = callManager();
  const { getAuthedUser } = useLoadUser();
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
      axios.post(SERVER_API + "/auth/login", formData),
      true,
      "/"
    );
    getAuthedUser(); //if token exist , set the user
  };

  return (
    <div className="flex flex-col gap-3 bg-white border p-4 py-5 rounded-md border-neutral-300 w-fit">
      <h1 className="w-full mb-3 font-weight300 text-neutral-800 text-size17">
        وارد شوید
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
        <LoadingButton loading={loading}>ورود</LoadingButton>
      </form>
      <Link href={"/auth/register"} className="text-size14">
        حساب کاربری ندارید ؟ ثبت نام کنید .
      </Link>
    </div>
  );
};
export default Login;
