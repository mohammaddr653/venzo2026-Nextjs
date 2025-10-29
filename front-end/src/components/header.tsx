import { BREAK_POINTS, SERVER_API } from "../../config";
import { useEffect, useState } from "react";
import { useUserStore, useWidthStore } from "../store";
import { nastaliq } from "@/app/fonts";
import Link from "next/link";
import SearchBar from "./search-bar";
import CartCounter from "./cart-counter";
import AccountButtons from "./account-buttons";
import callManager from "@/hooks/callManager";
import axios from "axios";

const Header = () => {
  return (
    <header className={`w-full max-w-screen fixed z-50 text-2xl bg-red-50`}>
      <div
        id="header-container"
        className={`desktop-header relative z-50 flex flex-row gap-10 justify-start items-center px-20 transition-all duration-300 delay-150`}
      >
        <Link href={"/"} className={`${nastaliq.className}`}>
          <h1>وانیمارت</h1>
        </Link>
        <div className="menu flex flex-row justify-between w-full items-center">
          <nav>
            <ul
              className={`flex px-0 flex-row gap-5 font-weight200 transition-all duration-300 delay-150 `}
            >
              {/* {categories?.length &&
                categories.map((category: any, index: any) => {
                  return (
                    category.motherId === "root" && (
                      <DeskMenuItem
                        key={category._id}
                        item={category}
                        focus={focus}
                        setFocusState={setFocusState}
                        categories={categories}
                      ></DeskMenuItem>
                    )
                  );
                })} */}
              <li>afe</li>
              <div
                className={`glass absolute w-[100vw] h-[100vh] bg-glass-shadow top-full right-0 z-30 transition-all duration-300 delay-150 invisible opacity-0`}
              ></div>
            </ul>
          </nav>
          <div className="flex flex-row gap-2 items-center">
            <div className="w-full px-0">
              <SearchBar className={"w-auto"}></SearchBar>
            </div>
            <span className="block bg-cu-neutral-700 w-1px h-6 rounded-3xl border-0"></span>
            <div className="block">
              <CartCounter width={40}></CartCounter>
            </div>
            <div className="block">
              <AccountButtons mode={"desktop"}></AccountButtons>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
