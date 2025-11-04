import Img from "@/components/img";
import { SERVER_API } from "../../../../config";
import ServiceSvg from "@/components/icons/service-svg";
import FastSvg from "@/components/icons/fast-svg";
import PaymentSvg from "@/components/icons/payment-svg";
import RecoverySvg from "@/components/icons/recovery-svg";

const TrustBar = () => {
  const trusts = [
    {
      id: 1,
      svg: <ServiceSvg width={50} fill={"currentColor"}></ServiceSvg>,
      title: "پشتیبانی 24 ساعته",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
    },
    {
      id: 2,
      svg: <FastSvg width={50} fill={"currentColor"}></FastSvg>,
      title: "تحویل سریع درب منزل",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
    },
    {
      id: 3,
      svg: <PaymentSvg width={50} height={50} fill={"currentColor"}></PaymentSvg>,
      title: "پرداخت امن",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
    },
    {
      id: 3,
      svg: <RecoverySvg width={50} fill={"currentColor"}></RecoverySvg>,
      title: "ضمانت بازگشت وجه",
      caption:
        "لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است.",
    },
  ];

  return (
    <>
      {trusts?.length ? (
        <div className="flex flex-row lg:gap-3 flex-wrap [&>*]:grow">
          {trusts.map((trust: any, index: any) => {
            return (
              <div
                className=" flex flex-col  lg:border lg:border-primary/70 lg:shadow-sm  items-center justify-start rounded-xl py-3 gap-3 basis-36"
                key={index}
              >
                <div className="flex flex-col items-center gap-3 text-primary">
                  {trust.svg}
                  <h3 className="text-size14 font-weight300 text-neutral-500">
                    {trust.title}
                  </h3>
                </div>
                <p className="text-size14 hidden px-4 md:block font-weight100 text-cu-neutral-800 text-justify">
                  {trust.caption}
                </p>
              </div>
            );
          })}
        </div>
      ) : null}
    </>
  );
};
export default TrustBar;
