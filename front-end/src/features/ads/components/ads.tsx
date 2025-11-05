import adcollection1 from "@/data/adcollection1.json";
import Image from "next/image";

const Ads = ({ width, height, sizes, className }: any) => {
  return (
    <>
      {adcollection1.map((ad: any, index: any) => {
        return (
          <div key={index}>
            <Image
              alt="ad-image"
              src={`/${ad.src}`}
              width={width}
              height={height}
              sizes={sizes}
              placeholder="blur"
              blurDataURL="/placeholder.jpg"
              className={className}
            ></Image>
          </div>
        );
      })}
    </>
  );
};
export default Ads;
