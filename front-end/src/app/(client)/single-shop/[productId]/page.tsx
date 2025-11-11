"use client";
import Header from "@/features/header/components/header";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";
import { BREAK_POINTS, SERVER_API } from "../../../../../config";
import { createPriceAndStockObj } from "@/helpers/createPriceAndStockObj";
import { useUserStore, useWidthStore } from "@/store";
import callManager from "@/hooks/callManager";
import { useParams } from "next/navigation";
import BreadCrumb from "@/components/breadCrumb";
import TitleRight from "@/components/title-right";
import SingleShopGallery from "@/features/single-shop-gallery/components/singleShop-gallery";
import Offpercent from "@/features/products/components/offpercent";
import PriceUnit from "@/components/priceUnit";
import NonSelectivePropertiesGrid from "@/features/product-properties/components/non-selective-properties-grid";
import SelectiveProperties from "@/features/product-properties/components/selective-properties";
import PropertiesTable from "@/features/product-properties/components/propertiesTable";

const SingleShopPage = () => {
  const { width, setWidth } = useWidthStore();
  const { productId } = useParams();
  const { call } = callManager();
  const { user } = useUserStore();
  const [product, setProduct] = useState<any>();
  const [motherCats, setMotherCats] = useState<any[]>([]);
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

  useEffect(() => {
    load();
  }, [productId]);

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

  async function load() {
    const response = await call(
      axios.get(SERVER_API + `/single-shop/withProperties/${productId}`),
      false
    );
    setProduct(response.data.data.product);
    setMotherCats([...response?.data.data.motherCategories.reverse()]);
  }

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

  return (
    <>
      {/* <Header focus={true}></Header> */}
      <main className="pt-20 pb-15">
        <div className="singleShopPage-container flex flex-col gap-5">
          {motherCats?.length ? (
            <BreadCrumb motherCats={motherCats}></BreadCrumb>
          ) : null}
          <div className="flex flex-col md:flex-row gap-10 px-5 md:px-20">
            <div className="flex flex-col items-end md:items-start md:flex-row gap-4 flex-6 relative">
              {width <= BREAK_POINTS.md && (
                <div className="w-full">
                  <TitleRight title={product?.name}></TitleRight>
                </div>
              )}
              <div className="flex flex-col gap-2">
                <i className="bi bi-heart text-size24"></i>
              </div>
              <SingleShopGallery product={product}></SingleShopGallery>
            </div>
            <div className=" flex-11 w-full flex flex-col gap-10">
              {width > BREAK_POINTS.md && (
                <TitleRight title={product?.name}></TitleRight>
              )}
              <NonSelectivePropertiesGrid
                product={product}
              ></NonSelectivePropertiesGrid>
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
                          <Offpercent
                            percent={priceAndStock.percent}
                          ></Offpercent>
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
            </div>
          </div>
          {product?.description === "" ? null : (
            <div className=" px-5 md:px-20 mt-0 md:mt-10 flex flex-col gap-4">
              <h4 className="font-weight300 text-neutral-800">بررسی محصول</h4>
              <div
                className="text-justify border border-neutral-300 p-5 rounded-md text-neutral-700 leading-loose text-size16"
                dangerouslySetInnerHTML={{ __html: product?.description }}
              ></div>
            </div>
          )}
          <PropertiesTable product={product}></PropertiesTable>
        </div>
      </main>
    </>
  );
};
export default SingleShopPage;
