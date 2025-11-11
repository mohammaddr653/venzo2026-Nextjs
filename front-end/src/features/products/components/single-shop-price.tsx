"use client";

import { ChangeEvent, useEffect, useState } from "react";
import SelectiveProperties from "./selective-properties";
import { SERVER_API } from "../../../../config";
import callManager from "@/hooks/callManager";
import axios from "axios";
import Offpercent from "./offpercent";
import PriceUnit from "@/components/priceUnit";
import { createPriceAndStockObj } from "@/helpers/createPriceAndStockObj";

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
        <div>
          {priceAndStock.discount ? (
            <>
              <div className="flex flex-row gap-1">
                <span className="text-nowrap line-through text-neutral-600 text-size14">
                  {priceAndStock.price}
                </span>
                <Offpercent percent={priceAndStock.percent}></Offpercent>
              </div>
              <div className="flex flex-row gap-1 items-center flex-nowrap">
                <span className="text-neutral-900 text-size24 font-weight300 text-nowrap">
                  {priceAndStock.discount.offer}
                </span>
                <PriceUnit></PriceUnit>
              </div>
            </>
          ) : (
            <div className="flex flex-row gap-1 items-center flex-nowrap">
              <span className="text-neutral-900 text-size24 font-weight300 text-nowrap">
                {priceAndStock.price}
              </span>
              <PriceUnit></PriceUnit>
            </div>
          )}
        </div>
        <button
          onClick={() => handleAddToCart(product._id)}
          className="bg-lime-600 text-white text-shadow-lg rounded-lg px-4 py-2"
        >
          افزودن به سبد
        </button>
      </div>
    </div>
  );
};

export default SingleShopPrice;
