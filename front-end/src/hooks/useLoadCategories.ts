"use client";
import axios from "axios";
import { SERVER_API } from "../../config";
import callManager from "./callManager";
import { useState } from "react";

const useLoadCategories = () => {
  const { call } = callManager();
  const [categories, setCategories] = useState<any[]>([]);

  async function loadCategories() {
    const response = await call(axios.get(SERVER_API + "/categories"), false);
    setCategories([...response.data.data]);
  }
  return { categories, loadCategories };
};

export default useLoadCategories;
