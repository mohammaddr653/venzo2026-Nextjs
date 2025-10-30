"use client";
import { useUserStore } from "@/store";
import { SERVER_API, SERVER_URL } from "../../../../config";
import "../../../assets/css/account-buttons.css";
import Img from "../../../components/img";
import Link from "next/link";
import axios from "axios";
import callManager from "@/hooks/callManager";

const AccountButtons = (props: any) => {
  const { call } = callManager();
  const { user } = useUserStore();

  async function userLogout() {
    const response = await call(
      axios.get(SERVER_API + "/token/logout"),
      false,
      "/"
    ); //deletes the token cookie
  }

  return (
    <>
      {!user ? (
        props.mode === "desktop" ? (
          <>
            <Link href={"/auth/login"}>
              <img
                src="/icons/icons8-user-default-64 (1).png"
                width={40}
                alt="user-icon"
              />
            </Link>
          </>
        ) : (
          <>
            <div className="flex flex-row gap-2 text-cu-neutral-900">
              <Link href={"/auth/login"}>ورود </Link>|
              <Link href={"/auth/register"}>ثبت نام </Link>
            </div>
          </>
        )
      ) : props.mode === "desktop" ? (
        <>
          <div className="account-hover relative shadow-sm shadow-cu-neutral-900 rounded-full flex justify-center items-center">
            <Img
              pic={user?.avatar}
              sizes={"500px"}
              className={"rounded-full aspect-square object-cover"}
              width={40}
              alt="user-avatar"
            ></Img>
            <div className="hidden-div py-3 absolute flex flex-column gap-2 rounded-xl bg-white shadow-sm shadow-cu-neutral-900 top-full left-full">
              {user?.isadmin ? (
                <>
                  <Link href={"/admin"}>پنل ادمین</Link> <hr />
                </>
              ) : null}
              <Link href={"/user"}>حساب کاربری</Link>
              <hr />
              <Link href={"/cart"}>سبد خرید</Link>
              <hr />
              <button className="cursor-pointer" onClick={userLogout}>
                خروج از حساب
              </button>
            </div>
          </div>
        </>
      ) : (
        <>
          <div className=" rounded-full flex flex-col gap-3 justify-center items-start">
            <Link
              href={"/user"}
              className="flex flex-row w-full gap-2 justify-between items-center"
            >
              <div className="flex flex-row gap-2 items-center">
                <Img
                  pic={user?.avatar}
                  sizes={"500px"}
                  className={"rounded-full aspect-square object-cover"}
                  width={40}
                ></Img>
                <h4>{user?.name}</h4>
              </div>
              <p className="text-size13 text-cu-neutral-800 font-weight300">
                حساب کاربری
              </p>
            </Link>
            {user?.isadmin ? (
              <>
                <Link
                  href={"/admin"}
                  className="flex flex-row w-full gap-2 justify-between items-center"
                >
                  <div className="flex flex-row gap-2 items-center">
                    <Img
                      pic={user?.avatar}
                      sizes={"500px"}
                      className={"rounded-full aspect-square object-cover"}
                      width={40}
                    ></Img>
                    <h4>{user?.name}</h4>
                  </div>
                  <p className="text-size13 text-cu-neutral-800 font-weight300">
                    پنل ادمین
                  </p>
                </Link>
              </>
            ) : null}
            <button
              onClick={userLogout}
              className="cursor-pointer font-weight300 text-red-600 text-size14 flex flex-row gap-2 items-center"
            >
              <img
                src="/images/icons/icons8-exit-50.png"
                alt="exit-icon"
                width={40}
              />
              خروج از حساب
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default AccountButtons;
