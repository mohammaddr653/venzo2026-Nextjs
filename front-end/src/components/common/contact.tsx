"use client";
import { roboto } from "@/app/ui/fonts";
import { useDarkStore, useWidthStore } from "@/store";
import PhoneSvg from "../icons/phone-svg";
import EmailSvg from "../icons/email-svg";
import LocationSvg from "../icons/location-svg";
import { BREAK_POINTS, SERVER_API } from "../../../config";
import { useForm } from "react-hook-form";
import CloseCircleSvg from "../icons/close-circle-svg";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import callManager from "@/hooks/callManager";
import axios from "axios";
import Image from "next/image";

const Contact = () => {
  const { call } = callManager();
  const { width } = useWidthStore();
  const { darkmode } = useDarkStore();

  const formSchema = z.object({
    name: z.string().min(1),
    email: z.string().min(1).email(),
    message: z.string().min(1),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  async function postMessage(data: any) {
    const response = await call(
      axios.post(SERVER_API + "/messages", data),
      true
    );
    reset();
  }

  return (
    <div
      id="contact-me"
      className="contact-container px-5 md:px-40 flex flex-col gap-6 text-neutral-800 dark:text-neutral-200 scroll-mt-20"
    >
      <h3 className="text-2xl font-weight400">تماس با من :</h3>
      <div className="relative overflow-hidden">
        {width < BREAK_POINTS.md ? null : (
          <>
            {darkmode ? (
              <video
                src="/852435-hd_1920_1080_30fps.mp4"
                className="absolute object-center object-cover h-full w-full"
                poster="/Annotation 2025-10-16 153734.webp"
                autoPlay
                loop
                muted
                playsInline
              ></video>
            ) : (
              <video
                src="/2040076-hd_1920_1080_24fps.mp4"
                className="absolute object-center object-cover h-full w-full"
                poster="/Annotation 2025-10-12 171545.webp"
                autoPlay
                loop
                muted
                playsInline
              ></video>
            )}
          </>
        )}
        <div className="relative z-10 flex items-stretch p-2 md:p-15 gap-10 justify-between md:bg-[#ffffff77] md:dark:bg-[#000000a2] bg-transparent">
          <div className="flex-[7] hidden md:flex items-center justify-start">
            {darkmode ? (
              <Image
                src={"/lets-talk-typo-dark.webp"}
                alt="lets talk - typography-dark"
                className="w-full"
                width={763}
                height={387}
                unoptimized
              ></Image>
            ) : (
              <Image
                src={"/Annotation 2025-10-12 172044.webp"}
                alt="lets talk - typography"
                className="w-full"
                width={763}
                height={387}
                unoptimized
              ></Image>
            )}
          </div>
          <div className="flex bg-white dark:bg-neutral-900 md:dark:bg-transparent md:bg-transparent md:backdrop-blur-xl shadow shadow-primary-glass rounded-lg flex-[3] flex-col gap-5 py-5 px-10 pb-6 items-stretch">
            <h4
              className={`text-center text-primary-glass dark:text-secondary text-2xl opacity-50 dark:opacity-30 ${roboto.className} font-weight800`}
            >
              GET IN TOUCH
            </h4>
            <form
              onSubmit={handleSubmit(postMessage)}
              className="flex flex-col items-stretch gap-4"
            >
              <label className="flex items-center">
                <input
                  type="text"
                  placeholder="نام"
                  className=" text-primary w-full transition-all duration-300 dark:text-neutral-600 bg-[#fafafaea] border border-transparent backdrop-blur-lg scrollbar-hide focus:border-secondary focus:shadow shadow-secondary rounded-lg p-2"
                  {...register("name")}
                />
                <div
                  className={`${
                    errors.name ? "w-[30px] py-1 pe-0 ps-1.5" : "w-0"
                  } transition-all duration-500 overflow-hidden`}
                >
                  <span className="text-red-700 bg-white aspect-square rounded-full flex justify-center items-center w-full">
                    <CloseCircleSvg fill={"currentColor"}></CloseCircleSvg>
                  </span>
                </div>
              </label>

              <label className="flex items-center">
                <input
                  type="text"
                  placeholder="ایمیل"
                  className=" text-primary w-full transition-all duration-300 dark:text-neutral-600 bg-[#fafafaea] border border-transparent backdrop-blur-lg scrollbar-hide focus:border-secondary focus:shadow shadow-secondary rounded-lg p-2"
                  {...register("email")}
                />
                <div
                  className={`${
                    errors.email ? "w-[30px] py-1 pe-0 ps-1.5" : "w-0"
                  } transition-all duration-500 overflow-hidden`}
                >
                  <span className="text-red-700 bg-white aspect-square rounded-full flex justify-center items-center w-full">
                    <CloseCircleSvg fill={"currentColor"}></CloseCircleSvg>
                  </span>
                </div>
              </label>

              <label className="flex items-start">
                <textarea
                  placeholder="پیام خود را بنویسید"
                  className=" resize-none w-full transition-all duration-300 text-primary dark:text-neutral-600 bg-[#fafafaea] border border-transparent backdrop-blur-lg scrollbar-hide h-[100px] focus:border-secondary focus:shadow shadow-secondary rounded-lg p-2"
                  {...register("message")}
                />
                <div
                  className={`${
                    errors.message ? "w-[30px] py-1 pe-0 ps-1.5" : "w-0"
                  } transition-all duration-500 overflow-hidden`}
                >
                  <span className="text-red-700 bg-white aspect-square rounded-full flex justify-center items-center w-full">
                    <CloseCircleSvg fill={"currentColor"}></CloseCircleSvg>
                  </span>
                </div>
              </label>

              <button
                type="submit"
                className="text-shadow transition-all duration-300 hover:animate-pulse cursor-pointer text-neutral-50 rounded-lg p-2 bg-primary border border-transparent hover:border-secondary hover:shadow shadow-secondary"
                aria-label="submit button"
              >
                تایید و ارسال
              </button>
            </form>
            <div
              className={`flex flex-col items-stretch text-left text-sm gap-3 ${roboto.className} font-weight500 text-neutral-600 dark:text-neutral-300 dark:text-shadow-md`}
            >
              <h4 className="flex flex-row-reverse gap-1 items-end">
                <PhoneSvg width={20} fill={"currentColor"}></PhoneSvg>
                0989377372231
              </h4>
              <h4 className="flex flex-row-reverse gap-1 items-end">
                <EmailSvg width={20} fill={"currentColor"}></EmailSvg>
                mohammaddr653@gmail.com
              </h4>
              <h4 className="flex flex-row gap-1 items-center" dir="ltr">
                <LocationSvg width={20} fill={"currentColor"}></LocationSvg>
                Iran , Khozestan
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
