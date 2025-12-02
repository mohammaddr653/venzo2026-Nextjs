"use client";
import axios from "axios";
import { SERVER_API } from "../../../config";
import callManager from "@/hooks/callManager";
import Logo from "@/components/logo";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function PassRestorePage() {
  const { call } = callManager();
  const formSchema = z.object({
    email: z.string().min(1).email(),
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: zodResolver(formSchema), mode: "onChange" });

  const postData = async (data: any) => {
    const response = await call(
      axios.post(SERVER_API + "/pass-restore", data),
      true
    );
  };

  return (
    <>
      <main>
        <div className="passrestore-page-container min-h-[100vh] flex flex-col items-center justify-center px-5 md:px-20 py-20">
          <div className="flex flex-col gap-3 bg-neutral-50/80 backdrop-blur-lg shadow-lg shadow-neutral-primary/30 border border-neutral-primary/5 p-4 py-5 rounded-xl min-h-[300px] min-w-[20%] overflow-hidden">
            <div className="h-[60px] flex justify-between items-stretch mb-3">
              <Logo></Logo>
              <h1 className="font-weight300 text-neutral-primary text-sm flex items-center">
                بازیابی رمز عبور
              </h1>
            </div>
            <form
              onSubmit={handleSubmit(postData)}
              className="flex flex-col gap-4 grow"
            >
              <label htmlFor="email" className="flex flex-col gap-1">
                <input
                  id="email"
                  type="text"
                  placeholder="ایمیل"
                  className="border w-full border-neutral-300 rounded-md p-2"
                  {...register("email")}
                />
                {errors.email ? (
                  <span className="text-sm text-red-600">
                    لطفا ایمیل خود را وارد کنید
                  </span>
                ) : null}
              </label>
              <button
                type="submit"
                className="bg-primary hover:animate-pulse p-2 rounded-lg text-white font-weight300 cursor-pointer mt-auto"
              >
                تایید
              </button>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}
