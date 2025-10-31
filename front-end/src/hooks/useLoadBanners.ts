"use client";
import axios from "axios";
import { SERVER_API } from "../../config";
import callManager from "./callManager";
import { useState } from "react";

const useLoadBanners = () => {
  const { call } = callManager();
  const [banners, setBanners] = useState<any[]>([]);

  async function loadBanners() {
    const response = await call(axios.get(SERVER_API + "/page/banners"), false);
    setBanners([...response.data.data]);
  }
  return { banners, loadBanners };
};

export default useLoadBanners;
