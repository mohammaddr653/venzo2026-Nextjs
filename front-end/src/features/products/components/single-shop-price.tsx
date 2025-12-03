"use client";

import { ChangeEvent, useEffect, useState } from "react";
import SelectiveProperties from "./selective-properties";
import { SERVER_API } from "../../../../config";
import callManager from "@/hooks/callManager";
import axios from "axios";
import { createPriceAndStockObj } from "@/helpers/createPriceAndStockObj";
import ProductPrice from "./product-price";

const SingleShopPrice = ({ product }: any) => {
  const { call } = callManager();
  const [priceAndStock, setPriceAndStock] = useState<any>({
    price: null,
    discount: null,
    percent: null,
    stock: null,
  });
  const [formData, setFormData] = useState<any>({
    selectedPropertyvalString: "",
    selectedPropertyvalValue: "",
  });

  async function handleAddToCart(id: string) {
    const response = await call(
      axios.post(SERVER_API + `/cart/${id}`, formData),
      true
    );
  }

  const handleSelectProperty = (
    e: ChangeEvent<HTMLInputElement>,
    propertyvalString: any
  ) => {
    if (e.target.checked) {
      setFormData({
        selectedPropertyvalString: e.target.value,
        selectedPropertyvalValue: propertyvalString,
      });
    }
  };

  function setDefault() {
    const selectiveProperty = product.properties.find(
      (property: any) => property.selective
    );
    if (selectiveProperty) {
      setFormData({
        selectedPropertyvalString:
          selectiveProperty?.values[0].propertyval._id.toString(),
        selectedPropertyvalValue:
          selectiveProperty?.values[0].propertyval.value,
      });
    }
  }

  function findSelectedPropertyval() {
    const selectiveProperty = product.properties.find(
      (property: any) => property.selective
    );
    const selectedPropertyval = selectiveProperty.values.find(
      (propertyval: any) =>
        formData.selectedPropertyvalString.includes(
          propertyval.propertyval._id.toString()
        )
    );
    return selectedPropertyval;
  }

  function handlePriceAndStock(obj: any) {
    const priceAndStockObj = createPriceAndStockObj(obj);
    setPriceAndStock({ ...priceAndStockObj });
  }

  useEffect(() => {
    if (product) {
      if (formData.selectedPropertyvalString === "") {
        handlePriceAndStock(product);
        setDefault();
      } else {
        const selectedPropertyval = findSelectedPropertyval();
        handlePriceAndStock(selectedPropertyval);
      }
    }
  }, [product, formData]);

  return (
    <div className="mt-auto flex flex-col gap-4">
      <SelectiveProperties
        product={product}
        formData={formData}
        handleSelectProperty={handleSelectProperty}
      ></SelectiveProperties>
      <div className=" flex flex-col gap-2 items-end">
        <ProductPrice priceAndStock={priceAndStock}></ProductPrice>
        {priceAndStock?.stock > 0 ? (
          <button
            onClick={() => handleAddToCart(product._id)}
            className="bg-lime-600 text-white text-shadow-lg rounded-lg px-4 py-2 font-weight300"
          >
            افزودن به سبد
          </button>
        ) : (
          <div className="bg-red-600/80 text-white text-shadow-lg rounded-lg px-4 py-2 font-weight300">
            ناموجود در انبار
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleShopPrice;
