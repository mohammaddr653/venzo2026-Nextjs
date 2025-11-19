"use client";
import "../../../assets/css/account-buttons.css";
import Img from "../../../components/img";
import Link from "next/link";
import ExitSvg from "@/components/icons/exit-svg";
import UserSvg from "@/components/icons/user-svg";
import useLoadUser from "@/hooks/useLoadUser";

const AccountButtons = (props: any) => {
  const { user, userLogout } = useLoadUser();

  return (
    <>
      {!user ? (
        props.mode === "desktop" ? (
          <>
            <Link href={"/auth/login"} className="text-neutral-primary">
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
          <div className="account-hover relative rounded-full flex justify-start items-center h-full gap-1">
            <Img
              pic={user?.avatar}
              alt="user-avatar"
              sizes={"36px"}
              width={36}
              height={36}
              loading="lazy"
              className={"rounded-full aspect-square h-full object-cover"}
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
              <button className="cu-account-button" onClick={userLogout}>
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
                  alt="user-avatar"
                  sizes={"40px"}
                  width={40}
                  height={40}
                  loading="lazy"
                  className={"rounded-full aspect-square object-cover"}
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
                      alt="admin-avatar"
                      sizes={"40px"}
                      width={40}
                      height={40}
                      loading="lazy"
                      className={"rounded-full aspect-square object-cover"}
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
