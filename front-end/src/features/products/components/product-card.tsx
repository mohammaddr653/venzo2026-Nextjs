import Img from "../../../components/img";
import Link from "next/link";
import {
  ProductPropertiesObj,
  ProductPropertyvalsObj,
} from "@/features/admin/types/properties";
import CartPlusSvg from "@/components/icons/cart-plus-svgrepo-com";
import { BREAK_POINTS } from "../../../../config";
import ProductCardPrice from "./product-card-price";

interface ProductCardProps {
  product: any;
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className="flex flex-col gap-1.5 h-full">
      <Link
        href={`/single-shop/${product._id}`}
        className="product-card group rounded-xl border-neutral-300 border overflow-hidden hover:border-primary/70 transition-shadow duration-300"
      >
        <div className="main-part w-full flex flex-col justify-start items-center h-full">
          <div className="relative w-full p-10">
            <div className="w-full relative overflow-hidden rounded-xl">
              <Img
                pic={product?.img}
                width={493}
                height={493}
                loading="lazy"
                alt="product-image"
                sizes={`
                  (max-width: ${BREAK_POINTS.sm}px) 433px,
                  (max-width: ${BREAK_POINTS.md}px) 310px,
                  (max-width: ${BREAK_POINTS.lg}px) 246px,
                  323px
                `}
                className={
                  "group-hover:scale-[1.1] transition-all duration-300 aspect-square relative object-cover w-full z-0"
                }
              ></Img>
            </div>
            <div className="flex absolute justify-start px-4 items-center top-4 right-0 rounded-xl w-full z-10 h-5">
              <div className="flex flex-row gap-1 h-full">
                {product?.properties
                  .find(
                    (property: ProductPropertiesObj) =>
                      property.property.type === "color"
                  )
                  ?.values.map((color: ProductPropertyvalsObj, index: any) => {
                    return color.propertyval?.hex ? (
                      <span
                        key={index}
                        style={{
                          backgroundColor:
                            "#" + color.propertyval.hex.toString(),
                        }}
                        className="h-full aspect-square rounded-full border-2 border-white outline-1 outline-neutral-300 inset-full-444"
                      ></span>
                    ) : null;
                  })}
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden w-full grow">
            <div className="relative flex flex-col justify-between items-center min-h-[150px] py-4 z-10">
              <p className="px-4 cu-text-truncate-2 text-size15 font-weight300 h-[45px] text-neutral-800">
                {product?.name}
              </p>
              <div className="mt-auto px-4 flex flex-row gap-1 w-full justify-between items-end flex-nowrap">
                <CartPlusSvg color={"#525252"}></CartPlusSvg>
                <ProductCardPrice product={product}></ProductCardPrice>
              </div>
            </div>
            <img
              //rez:150*93
              src="/jk4377d2c3969965e3b8e7e7dcdfc0be536.png"
              alt="sticker"
              width={150}
              height={93}
              sizes={`150px`}
              loading="lazy"
              className="pattern-part object-cover absolute bottom-0 right-0 opacity-[0.05] z-0"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductCard;
