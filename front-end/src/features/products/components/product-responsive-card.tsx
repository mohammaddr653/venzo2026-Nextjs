import Link from "next/link";
import {
  ProductPropertiesObj,
  ProductPropertyvalsObj,
} from "@/features/admin/types/properties";
import Img from "@/components/img";
import CartPlusSvg from "@/components/icons/cart-plus-svgrepo-com";
import ProductPrice from "./product-price";
import { BREAK_POINTS } from "../../../../config";

interface ProductCardProps {
  product: any;
}

const ProductResponsiveCard = ({ product }: ProductCardProps) => {
  return (
    <div className="flex flex-col gap-1.5 h-full">
      <Link
        href={`/single-shop/${product._id}`}
        className="product-card group rounded-xl border-neutral-200 border overflow-hidden hover:shadow-card-neutral transition-shadow duration-300"
      >
        <div className=" main-part w-full flex flex-row sm:flex-col justify-start items-stretch h-full">
          <div className="relative flex-[1] p-2">
            <div className="w-full relative overflow-hidden rounded-xl">
              <Img
                pic={product?.img}
                width={354}
                height={354}
                alt="product-image"
                sizes={`
                  (max-width: ${BREAK_POINTS.sm}px) 191px,
                  (max-width: ${BREAK_POINTS.md}px) 336px,
                  (max-width: ${BREAK_POINTS.lg}px) 255px,
                  354px
                `}
                className={
                  "group-hover:scale-[1.1] transition-all duration-300 relative aspect-square object-cover w-full z-0"
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
                        className="h-full aspect-square rounded-full border-2 border-white outline-1 outline-[#444] inset-full-444"
                      ></span>
                    ) : null;
                  })}
              </div>
            </div>
          </div>
          <div className="relative overflow-hidden flex-[2]">
            <div className="relative flex flex-col justify-between items-center gap-4 min-h-[150px] h-full py-4 z-10">
              <p className="px-4 w-full sm:w-auto">{product?.name}</p>
              <div className="mt-auto px-4 flex flex-row gap-1 w-full justify-between items-end flex-nowrap">
                <CartPlusSvg color={"#525252"}></CartPlusSvg>
                <ProductPrice product={product}></ProductPrice>
              </div>
            </div>
            <img
              src="/jk4377d2c3969965e3b8e7e7dcdfc0be536.png"
              alt=""
              width={150}
              className="pattern-part object-cover absolute bottom-0 right-0 opacity-[0.05] z-0"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};
export default ProductResponsiveCard;
