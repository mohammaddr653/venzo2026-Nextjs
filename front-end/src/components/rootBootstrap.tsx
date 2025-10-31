//این کامپوننت داده های اولیه مورد نیاز ما را میگیرد و در گلوبال ذخیره میکند
"use client";
import { useEffect } from "react";
import useLoadUser from "@/hooks/useLoadUser";
import axios from "axios";

const RootBootstrap = () => {
  const { getAuthedUser } = useLoadUser();

  useEffect(() => {
    axios.defaults.withCredentials = true; //sends httponly cookies to the server by default
    getAuthedUser(); //if token exist , set the user
  }, []);

  return null;
};

export default RootBootstrap;
