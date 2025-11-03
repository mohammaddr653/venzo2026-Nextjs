"use client";
import { useUserStore } from "@/store";
import { SERVER_API } from "../../../../config";
import "../../../assets/css/account-buttons.css";
import Img from "../../../components/img";
import Link from "next/link";
import axios from "axios";
import callManager from "@/hooks/callManager";
import ExitSvg from "@/components/icons/exit-svg";
import UserSvg from "@/components/icons/user-svg";

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
            <Link href={"/auth/login"} className="text-primary">
              <UserSvg width={35} fill={"currentColor"}></UserSvg>
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
              className={
                "rounded-full aspect-square min-w-[35px] w-[35px] object-cover"
              }
              alt="user-avatar"
            ></Img>
            <div className="hidden-div py-3 absolute flex flex-column rounded-xl bg-primary/80 border border-primary top-full mt-2 left-full">
              {user?.isadmin ? (
                <>
                  <Link className="cu-account-button" href={"/admin"}>
                    پنل ادمین
                  </Link>
                </>
              ) : null}
              <Link className="cu-account-button" href={"/user"}>
                حساب کاربری
              </Link>
              <Link className="cu-account-button" href={"/cart"}>
                سبد خرید
              </Link>
              <button
                className="cu-account-button"
                onClick={userLogout}
              >
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
              <ExitSvg fill={"currentColor"} width={40}></ExitSvg>
              خروج از حساب
            </button>
          </div>
        </>
      )}
    </>
  );
};
export default AccountButtons;
