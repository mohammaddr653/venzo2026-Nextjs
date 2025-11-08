"use client";

import PriceUnit from "@/components/priceUnit";
import Offpercent from "./offpercent";
import { createPriceAndStockObj } from "@/helpers/createPriceAndStockObj";
import { useEffect, useState } from "react";

const ProductPrice = ({ product }: any) => {
  const [priceAndStock, setPriceAndStock] = useState<any>({
    price: null,
    discount: null,
    percent: null,
    stock: null,
  });

  function handlePriceAndStock() {
    const selectiveProperty = product.properties.find(
      (property: any) => property.selective
    );
    if (selectiveProperty) {
      let lowest = null;

      for (let propertyval of selectiveProperty.values) {
        if (lowest) {
          const existingConfig = lowest.discount?.offer ?? lowest.price;
          const newConfig = propertyval.discount?.offer ?? propertyval.price;
          if (newConfig < existingConfig) {
            lowest = propertyval;
          }
        } else {
          lowest = propertyval;
        }
        const priceAndStockObj = createPriceAndStockObj(lowest);
        setPriceAndStock({ ...priceAndStockObj });
      }
    } else {
      const priceAndStockObj = createPriceAndStockObj(product);
      setPriceAndStock({ ...priceAndStockObj });
    }
  }

  useEffect(() => {
    if (product) {
      handlePriceAndStock();
    }
  }, [product]);

  return (
    <div className="flex flex-col items-end">
      {priceAndStock.discount ? (
        <>
          <div className="flex flex-row gap-1 items-center">
            <span className="text-nowrap align-middle line-through text-neutral-600 text-size14">
              {priceAndStock.price}
            </span>
            <Offpercent percent={priceAndStock.percent}></Offpercent>
          </div>
          <div className="flex flex-row gap-1 items-center flex-nowrap">
            <span className="text-neutral-900  text-size17 sm:text-size24 font-weight300 text-nowrap">
              {priceAndStock.discount.offer}
            </span>
            <PriceUnit></PriceUnit>
          </div>
        </>
      ) : (
        <div className="flex flex-row gap-1 items-center flex-nowrap">
          <span className="text-neutral-900 text-size17 sm:text-size24 font-weight300 text-nowrap">
            {priceAndStock.price}
          </span>
          <PriceUnit></PriceUnit>
        </div>
      )}
    </div>
  );
};

export default ProductPrice;
