"use client";
import { SERVER_API, SITE_KEY } from "../../../../config";
// @ts-ignore
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { useRef } from "react";
import callManager from "@/hooks/callManager";
import axios from "axios";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import Logo from "@/components/logo";

const Register = () => {
  const { call } = callManager();
  const reRef = useRef<ReCAPTCHA | null>(null);
  const formSchema = z.object({
    name: z.string().min(1),
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
      axios.post(SERVER_API + "/auth/register", data),
      true,
      "/auth/login"
    );
    reRef.current?.reset();
    reset();
  }

  return (
    <div className="flex flex-col gap-3 bg-neutral-50/80 backdrop-blur-lg shadow-lg shadow-neutral-primary/30 border border-neutral-primary/5 p-4 py-5 rounded-xl min-h-[465px] overflow-hidden">
      <div className="h-[60px] flex justify-between items-stretch mb-3">
        <Logo></Logo>
        <h1 className="font-weight300 text-neutral-primary text-sm flex items-center">
          ثبت نام
        </h1>
      </div>

      <form onSubmit={handleSubmit(postData)} className="flex flex-col gap-4">
        <label htmlFor="name" className="flex flex-col gap-1">
          <input
            id="name"
            type="text"
            placeholder="نام"
            className="border border-neutral-300 rounded-md p-2"
            {...register("name")}
          />
          {errors.name ? (
            <span className="text-sm text-red-600">
              لطفا نام خود را وارد کنید
            </span>
          ) : null}
        </label>
        <label htmlFor="email" className="flex flex-col gap-1">
          <input
            id="email"
            type="text"
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
            id="password"
            type="text"
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
        <div className="min-h-[78px] w-full overflow-hidden">
          <ReCAPTCHA
            sitekey={SITE_KEY}
            ref={reRef}
            onChange={(value: string) => setValue("token", value || "")}
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
          ساخت حساب
        </button>
      </form>
      <Link href={"/auth/login"} className="text-size14">
        قبلا ثبت نام کرده اید ؟ وارد شوید .
      </Link>
    </div>
  );
};
export default Register;
