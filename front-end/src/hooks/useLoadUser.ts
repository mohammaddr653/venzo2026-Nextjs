"use client";
import axios from "axios";
import { SERVER_API } from "../../config";
import callManager from "./callManager";
import { useUserStore } from "../store";
import { usePathname } from "next/navigation";

const useLoadUser = () => {
  const { call } = callManager();
  const { user, setUser } = useUserStore();
  const pathname = usePathname();

  async function getAuthedUser() {
    const response = await call(axios.get(SERVER_API + "/token"), false);
    const me = response?.data?.data?.user;
    me ? setUser(me) : setUser(null);
  }
  async function userLogout() {
    const response = await call(
      axios.get(SERVER_API + "/token/logout"),
      false,
      pathname
    ); //deletes the token cookie
  }

  return { user, getAuthedUser, userLogout };
};

export default useLoadUser;
