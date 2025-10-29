"use client";
import axios from "axios";
import { SERVER_API } from "../../config";
import callManager from "./callManager";
import { useUserStore } from "../store";

const useLoadUser = () => {
  const { call, loading } = callManager();
  const { user, setUser } = useUserStore();

  async function getAuthedUser() {
    const response = await call(axios.get(SERVER_API + "/token"), false);
    const me = response?.data?.data?.user;
    me ? setUser(me) : setUser(null);
  }
  return { user, getAuthedUser };
};

export default useLoadUser;
