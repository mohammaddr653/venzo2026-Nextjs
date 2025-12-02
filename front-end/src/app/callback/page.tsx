"use client";
import { SERVER_API } from "../../../config";
import { useEffect, useState } from "react";
import callManager from "@/hooks/callManager";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import Image from "next/image";

export default function CallbackPage() {
  const { call } = callManager();
  const allParams = useSearchParams();
  const [info, setInfo] = useState<any>({ code: null, data: null });
  const [order, setOrder] = useState<any>({});

  async function loadOrder() {
    const response = await call(
      axios.get(SERVER_API + `/orders/${info.data}`),
      false
    );
    setOrder({ ...response.data.data });
  }
  useEffect(() => {
    setInfo({ code: allParams.get("code"), data: allParams.get("data") });
  }, [allParams]);

  useEffect(() => {
    if (info.code === "200" && info.data !== "undefined" && info.data)
      loadOrder();
  }, [info]);

  return (
    <>
      <main>
        <div className="callback-page-container min-h-[100vh] flex flex-col items-center justify-center px-5 md:px-20 py-20">
          <div className="flex flex-col items-center justify-center gap-3 bg-neutral-50/80 backdrop-blur-lg shadow-lg shadow-neutral-primary/30 border border-neutral-primary/5 p-4 py-8 rounded-xl min-h-[300px] min-w-[20%] overflow-hidden">
            {info.code === "404" && (
              <h4>
                متاسفانه سفارش شما یافت نشد . اگر مبلغی از حسابتان برداشت شده
                بطور خودکار به حساب باز میگردد
              </h4>
            )}
            {info.code === "400" && <h4>تراکنش ناموفق بود</h4>}
            {info.code === "500" && (
              <h4>
                امکان تایید تراکنش وجود نداشت ، لطفا با پشتیبانی تماس حاصل
                فرمایید
              </h4>
            )}
            {info.code === "401" && <h4>تراکنش تایید نشد</h4>}
            {info.code === "101" && <h4>تراکنش قبلا تایید شده</h4>}
            {info.code === "200" && (
              <>
                <h4>سفارش شما تایید شد . از خریدتان متشکریم .</h4>
                <h4 className="font-weight300">شناسه تراکنش : {order?.referenceId}</h4>
              </>
            )}
            <Image
              alt="Payment Terminal with Credit Card and Cash
"
              src={"/callback-image.png"}
              width={300}
              height={300}
              sizes="300px"
              className="w-full max-w-[300px]"
            ></Image>
          </div>
        </div>
      </main>
    </>
  );
}
