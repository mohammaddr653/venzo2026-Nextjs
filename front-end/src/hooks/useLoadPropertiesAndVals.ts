"use client";
import axios from "axios";
import { SERVER_API } from "../../config";
import callManager from "./callManager";
import { useState } from "react";

const useLoadPropertiesAndVals = () => {
  const { call } = callManager();
  const [propertiesAndVals, setPropertiesAndVals] = useState<any>([]);

  async function loadPropertiesAndVals() {
    const response = await call(
      axios.get(SERVER_API + "/admin/dashboard/properties/withvals"),
      false
    );
    setPropertiesAndVals([...response.data.data]);
  }
  return { propertiesAndVals, loadPropertiesAndVals };
};

export default useLoadPropertiesAndVals;
