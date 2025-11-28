"use client";
import { useRef } from "react";
import axios from "axios";
import { SERVER_API, SITE_KEY } from "../../../../config";
// @ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import useLoadUser from "@/hooks/useLoadUser";
import callManager from "@/hooks/callManager";
import z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Logo from "@/components/logo";
const Login = () => {
  const { call } = callManager();
  const { getAuthedUser } = useLoadUser();
  const reRef = useRef<ReCAPTCHA | null>(null);
  const formSchema = z.object({
    email: z.string().min(1).email(),
    password: z.string().min(1),
    token: z.string().min(1),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  async function postData(data: any) {
    const response = await call(
      axios.post(SERVER_API + "/auth/login", data),
      true,
      "/verify"
    );
    getAuthedUser(); //if token exist , set the user
    reRef.current?.reset();
    reset();
  }

  return (
    <div className="flex flex-col gap-3 bg-neutral-50/80 backdrop-blur-lg shadow-lg shadow-neutral-primary/30 border border-neutral-primary/5 p-4 py-5 rounded-xl min-h-[441px] overflow-hidden">
      <div className="h-[60px] flex justify-between items-stretch mb-3">
        <Logo></Logo>
        <h1 className="font-weight300 text-neutral-primary text-sm flex items-center">
          ورود به حساب
        </h1>
      </div>
      <form onSubmit={handleSubmit(postData)} className="flex flex-col gap-4">
        <label htmlFor="email" className="flex flex-col gap-1">
          <input
            type="text"
            id="email"
            placeholder="ایمیل"
            className="border border-neutral-300 rounded-md p-2"
            {...register("email")}
          />
          {errors.email ? (
            <span className="text-sm text-red-600">
              لطفا ایمیل خود را وارد کنید
            </span>
          ) : null}
        </label>
        <label htmlFor="password" className="flex flex-col gap-1">
          <input
            type="text"
            id="password"
            placeholder="رمز عبور"
            className="border border-neutral-300 rounded-md p-2"
            {...register("password")}
          />
          {errors.password ? (
            <span className="text-sm text-red-600">
              لطفا رمز عبور خود را وارد کنید
            </span>
          ) : null}
        </label>
        <div className="min-h-[78px] w-full">
          <ReCAPTCHA
            sitekey={SITE_KEY}
            ref={reRef}
            onChange={(value: string) => {
              setValue("token", value || "");
            }}
          />
          {errors.token ? (
            <span className="text-sm text-red-600">
              لطفا ریکپچا را تایید کنید
            </span>
          ) : null}
        </div>
        <button
          type="submit"
          className="bg-primary hover:animate-pulse p-2 rounded-lg text-white font-weight300 cursor-pointer"
        >
          ورود
        </button>
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
