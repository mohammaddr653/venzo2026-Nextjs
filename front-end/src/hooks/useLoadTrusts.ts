"use client";
import axios from "axios";
import { SERVER_API } from "../../config";
import callManager from "./callManager";
import { useState } from "react";

const useLoadTrusts = () => {
  const { call } = callManager();
  const [trusts, setTrusts] = useState<any[]>([]);

  async function loadTrusts() {
    const response = await call(axios.get(SERVER_API + "/page/trusts"), false);
    setTrusts([...response.data.data]);
  }
  return { trusts, loadTrusts };
};

export default useLoadTrusts;
