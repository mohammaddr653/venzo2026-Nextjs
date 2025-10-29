//this custom hook is for managing axios calls
"use client";
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";

const callManager = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function call(call: any, sucShow: boolean, path?: string) {
    setLoading(true);
    try {
      const response = await call;
      if (path) {
        path === window.location.pathname
          ? window.location.reload()
          : router.push(path);
      }
      sucShow ? toast(response.data.message) : null;
      return response;
    } catch (error: any) {
      if (error.response?.data) {
        if (error.response.data.data?.errors) {
          error.response.data.data.errors.forEach((msg: any) => {
            toast(msg);
          });
        } else {
          toast(error.response.data.message);
        }
      } else {
        toast("خطایی رخ داد");
      }
    } finally {
      setLoading(false);
    }
  }
  return { call, loading };
};

export default callManager;
