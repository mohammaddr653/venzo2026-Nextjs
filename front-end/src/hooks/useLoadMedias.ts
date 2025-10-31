"use client";
import axios from "axios";
import { SERVER_API } from "../../config";
import callManager from "./callManager";
import { useState } from "react";

const useLoadMedias = () => {
  const { call } = callManager();
  const [medias, setMedias] = useState<any[]>([]);

  async function loadMedias() {
    const response = await call(
      axios.get(SERVER_API + "/admin/dashboard/medias"),
      false
    );
    setMedias([...response.data.data]);
  }
  return { medias, loadMedias };
};

export default useLoadMedias;
