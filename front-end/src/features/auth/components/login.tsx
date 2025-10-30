"use client"
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { SERVER_API, SITE_KEY } from "../../../../config";
// @ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import useLoadUser from "@/hooks/useLoadUser";
import callManager from "@/hooks/callManager";
const Login = () => {
  const { call } = callManager();
  const { getAuthedUser } = useLoadUser();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    token: "",
  });
  const reRef = useRef<ReCAPTCHA | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (value: any) => {
    setFormData({ ...formData, token: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/auth/login", formData),
      true,
      "/"
    );
    getAuthedUser(); //if token exist , set the user
    reRef.current?.reset();
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
        <ReCAPTCHA
          sitekey={SITE_KEY}
          ref={reRef}
          onChange={handleCaptchaChange}
        />
        <button type="submit">ورود</button>
      </form>
      <Link href="/pass-restore" className="text-size14">
        بازیابی رمز عبور
      </Link>
      <Link href={"/auth/register"} className="text-size14">
        حساب کاربری ندارید ؟ ثبت نام کنید .
      </Link>
    </div>
  );
};
export default Login;
