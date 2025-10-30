"use client"
import { SERVER_API, SITE_KEY } from "../../../../config";
// @ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { useRef, useState } from "react";
import callManager from "@/hooks/callManager";
import axios from "axios";

const Register = () => {
  const { call } = callManager();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    token: "",
  });
  const reRef = useRef<ReCAPTCHA | null>(null);

  const handleCaptchaChange = (value: any) => {
    setFormData({ ...formData, token: value });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/auth/register", formData),
      true,
      "/auth/login"
    );
    reRef.current?.reset();
  };

  return (
    <div className="flex flex-col gap-3 bg-white border p-4 py-5 rounded-md border-neutral-300 w-fit">
      <h1 className="w-full mb-3 font-weight300 text-neutral-800 text-size17">
        ساخت حساب کاربری
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          name="name"
          placeholder="نام"
          className="border border-neutral-300 rounded-md p-2"
          onChange={handleChange}
        />
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
        <button type="submit">ثبت نام</button>
      </form>
      <br />
      <Link href={"/auth/login"}>قبلا ثبت نام کرده اید ؟ وارد شوید .</Link>
    </div>
  );
};
export default Register;
