"use client";
import AvatarSelector from "@/components/avatarSelector";
import { BREAK_POINTS, SERVER_API } from "../../../../config";
import axios from "axios";
import { useEffect, useState } from "react";
import { useWidthStore } from "@/store";
import { useRouter, useSearchParams } from "next/navigation";
import callManager from "@/hooks/callManager";
import useLoadUser from "@/hooks/useLoadUser";
import Link from "next/link";
import CloseSvg from "@/components/icons/close-svg";
import ClientOrders from "@/features/orders/components/client-orders";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function UserPage() {
  const { call } = callManager();
  const { user, getAuthedUser } = useLoadUser();
  const allParams = useSearchParams();
  const router = useRouter();
  const [route, setRoute] = useState<any>();
  const { width, setWidth } = useWidthStore();
  const [formData, setFormData] = useState({
    name: "",
  });

  function refresh() {
    setFormData({
      name: user ? user.name : "",
    });
  }

  useEffect(() => {
    setRoute(allParams.get("route") ?? "default"); //اگر در آدرس روت وجود داشت بذار وگرنه پنجره ویرایش حساب رو نشون بده
  }, [allParams]);

  useEffect(() => {
    refresh();
  }, [user]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoute = async (e: any) => {
    e.preventDefault();
    let currentParams = new URLSearchParams(allParams);
    currentParams.set("route", e.target.id ? e.target.id : "default");
    router.push(`?${currentParams}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await call(
      axios.put(SERVER_API + "/user/dashboard", formData),
      true
    );
    getAuthedUser();
  };

  return (
    <>
      <main>
        <div className="userpage-container flex md:gap-2 justify-center md:justify-between items-stretch px-5 md:px-20 py-20">
          <div className="flex flex-[1] flex-col items-center">
            <AvatarSelector user={user}></AvatarSelector>
            <h1 className="text-center py-2 font-extrabold">{user?.name}</h1>
            <div className="w-full flex flex-col gap-2 items-stretch mt-10">
              <button
                id="edit-account"
                className={`text-right py-1 cursor-pointer ${
                  (route === "edit-account" || route === "default") &&
                  width > BREAK_POINTS.md &&
                  "text-green-600 font-extrabold"
                }`}
                onClick={(e) => handleRoute(e)}
              >
                ویرایش مشخصات
              </button>
              <button
                id="orders"
                className={`text-right py-1 cursor-pointer ${
                  route === "orders" &&
                  width > BREAK_POINTS.md &&
                  "text-green-600 font-extrabold"
                }`}
                onClick={(e) => handleRoute(e)}
              >
                سفارش های من
              </button>
              <Link href={"/cart"}>سبد خرید</Link>
            </div>
          </div>
          <div className="md:flex-[4] w-0 md:border-r border-neutral-300">
            {(route === "edit-account" || route === "default") && (
              <div
                className={`fixed ${
                  route === "default" && "hidden md:flex"
                } bg-white flex flex-col gap-5 py-2 md:static right-0 top-0 w-full h-screen md:w-auto md:h-auto z-50 px-5`}
              >
                <div className="flex justify-between gap-2 items-center">
                  <h5>ویرایش مشخصات</h5>
                  <button
                    className="md:hidden cursor-pointer p-2 flex justify-center items-center"
                    onClick={(e) => handleRoute(e)}
                  >
                    <CloseSvg width={25} fill={"currentColor"}></CloseSvg>
                  </button>
                </div>
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    placeholder="name"
                    name="name"
                    value={formData.name}
                    className="border border-neutral-300 rounded-md p-2"
                    onChange={handleChange}
                  />
                  <br />
                  <button
                    className={
                      "mt-3 rounded-md py-1 px-2 border border-neutral-300 bg-green-600 text-white text-shadow"
                    }
                  >
                    ثبت تغییرات
                  </button>
                </form>
              </div>
            )}
            {route === "orders" && (
              <div
                className={`fixed overflow-y-scroll md:overflow-y-auto bg-white flex flex-col gap-5 py-2 md:static right-0 top-0 w-full h-screen md:w-auto md:h-auto z-50 px-5`}
              >
                <div className="flex justify-between gap-2 items-center">
                  <h5>سفارش های من</h5>
                  <button
                    className="md:hidden cursor-pointer p-2 flex justify-center items-center"
                    onClick={(e) => handleRoute(e)}
                  >
                    <CloseSvg width={25} fill={"currentColor"}></CloseSvg>
                  </button>
                </div>
                <ClientOrders></ClientOrders>
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
