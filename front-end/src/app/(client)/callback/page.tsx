import Header from "@/features/header/components/header";
import { SERVER_API } from "../../../../config";

export default async function CallbackPage({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const resolvedSearchParams = await searchParams;
  const info = {
    code: resolvedSearchParams.code,
    data: resolvedSearchParams.data,
  };
  let order;

  if (info.code === "200" && info.data !== "undefined" && info.data) {
    const response = (await (
      await fetch(`${SERVER_API}/orders/${info.data}`, {
        cache: "no-store",
      })
    ).json()) as any;

    order = { ...response?.data };
  }

  return (
    <>
      <Header focus={true}></Header>
      <main>
        <div className="callback-page-container flex flex-col gap-5 py-20">
          <h1>callback page</h1>
          {info.code === "404" && (
            <h4>
              متاسفانه سفارش شما یافت نشد . اگر مبلغی از حسابتان برداشت شده بطور
              خودکار به حساب باز میگردد
            </h4>
          )}
          {info.code === "400" && <h4>تراکنش ناموفق بود</h4>}
          {info.code === "500" && (
            <h4>
              امکان تایید تراکنش وجود نداشت ، لطفا با پشتیبانی تماس حاصل فرمایید
            </h4>
          )}
          {info.code === "401" && <h4>تراکنش تایید نشد</h4>}
          {info.code === "101" && <h4>تراکنش قبلا تایید شده</h4>}
          {info.code === "200" && (
            <>
              <h4>سفارش شما تایید شد . از خریدتان متشکریم .</h4>
              <h4>شناسه تراکنش : {order?.referenceId}</h4>
            </>
          )}
        </div>
      </main>
    </>
  );
}
