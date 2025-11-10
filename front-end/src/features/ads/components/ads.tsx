import Image from "next/image";
import { DEFAULT_IMAGE } from "../../../../config";

const Ads = ({ data, width, height, sizes, className }: any) => {
  return (
    <>
      {data.map((ad: any, index: any) => {
        return (
          <div key={index}>
            <Image
              alt="ad-image"
              src={`/${ad.src}`}
              width={width}
              height={height}
              sizes={sizes}
              placeholder="blur"
              blurDataURL={DEFAULT_IMAGE}
              className={className}
            ></Image>
          </div>
        );
      })}
    </>
  );
};
export default Ads;
