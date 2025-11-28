import PriceUnit from "@/components/priceUnit";
import Offpercent from "./offpercent";

const ProductPrice = ({ priceAndStock }: any) => {
  return (
    <div className="flex flex-col items-end">
      {priceAndStock?.discount ? (
        <>
          <div className="flex flex-row gap-1 items-center">
            <span className="text-nowrap align-middle line-through text-neutral-600 text-size14">
              {priceAndStock?.price}
            </span>
            <Offpercent percent={priceAndStock?.percent}></Offpercent>
          </div>
          <div className="flex flex-row gap-1 items-center flex-nowrap">
            <span className="text-neutral-900 text-size17 md:text-[20px] font-weight300 text-nowrap">
              {priceAndStock?.discount.offer}
            </span>
            <PriceUnit></PriceUnit>
          </div>
        </>
      ) : (
        <div className="flex flex-row gap-1 items-center flex-nowrap">
          <span className="text-neutral-900 text-size17 md:text-[20px] font-weight300 text-nowrap">
            {priceAndStock?.price}
          </span>
          <PriceUnit></PriceUnit>
        </div>
      )}
    </div>
  );
};

export default ProductPrice;
