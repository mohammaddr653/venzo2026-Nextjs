"use client";

import { createPriceAndStockObj } from "@/helpers/createPriceAndStockObj";
import { useEffect, useState } from "react";
import ProductPrice from "./product-price";

const ProductCardPrice = ({ product }: any) => {
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

  return <ProductPrice priceAndStock={priceAndStock}></ProductPrice>;
};

export default ProductCardPrice;
