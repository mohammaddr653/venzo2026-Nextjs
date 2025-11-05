import Image from "next/image";

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
