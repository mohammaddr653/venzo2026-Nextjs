"use client";

import Img from "@/components/img";
import DiscountManager from "@/features/admin/components/discountManager";
import Library from "@/features/admin/components/library";
import PropertiesManager from "@/features/admin/components/propertiesManager";
import RichTextEditor from "@/features/admin/components/rich-text-editor";
import axios from "axios";
import { SERVER_API } from "../../../../../../config";
import { useEffect, useRef, useState } from "react";
import { buildSelectionList } from "@/helpers/buildSelectionList";
import { useParams } from "next/navigation";
import { ProductPropertiesObj } from "@/features/admin/types/properties";
import useLoadPropertiesAndVals from "@/hooks/useLoadPropertiesAndVals";
import useLoadCategories from "@/hooks/useLoadCategories";
import callManager from "@/hooks/callManager";
import { useUserStore } from "@/store";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function UpdateProductPage() {
  const { call } = callManager();
  const { user } = useUserStore();
  const selectionList = useRef<HTMLSelectElement>(null);
  const { categories, loadCategories } = useLoadCategories();
  const { propertiesAndVals, loadPropertiesAndVals } =
    useLoadPropertiesAndVals();
  const [libShow, setLibShow] = useState(false);
  const [galleryLibShow, setGalleryLibShow] = useState(false);
  const [selectedGalleryImgs, setSelectedGalleryImgs] = useState<any>([]);
  const [selectedImgs, setSelectedImgs] = useState<any>([]);

  const [formData, setFormData] = useState({
    name: "",
    price: "",
    discount: "",
    stock: "",
    categoryId: "",
    description: "",
    properties: [],
    img: "",
    gallery: [],
  });
  const [properties, setProperties] = useState<ProductPropertiesObj[]>([]);
  const { productId } = useParams<{ productId: string }>();
  const editorRef = useRef<any>(null);
  const [discount, setDiscount] = useState<any>(null);

  useEffect(() => {
    setFormData((prev: any) => {
      return {
        ...prev,
        discount: discount ? JSON.stringify(discount) : "",
      };
    });
  }, [discount]);

  useEffect(() => {
    if (selectedImgs.length) {
      setFormData((prev: any) => {
        return { ...prev, img: selectedImgs[0]._id };
      });
    } else {
      setFormData((prev: any) => {
        return { ...prev, img: "" };
      });
    }
  }, [selectedImgs]);

  useEffect(() => {
    const gallery = selectedGalleryImgs.map((img: any) => img._id);
    setFormData((prev: any) => {
      return {
        ...prev,
        gallery: JSON.stringify([...gallery]),
      };
    });
  }, [selectedGalleryImgs]);

  async function loadOneProduct() {
    const response = await call(
      axios.get(SERVER_API + `/admin/dashboard/products/${productId}`),
      false
    );
    const matchedProduct = response.data.data;
    setFormData({
      ...formData,
      name: matchedProduct.name,
      price: matchedProduct.price,
      stock: matchedProduct.stock,
      categoryId: matchedProduct.categoryId ? matchedProduct.categoryId : "",
      description: matchedProduct.description,
      properties: matchedProduct.properties,
    });
    setProperties([...matchedProduct.properties]);
    if (matchedProduct.img)
      setSelectedImgs((prev: any) => {
        return [...prev, matchedProduct.img];
      });
    if (matchedProduct.gallery?.length)
      setSelectedGalleryImgs([...matchedProduct.gallery]);

    if (matchedProduct.discount) setDiscount({ ...matchedProduct.discount });
  }

  function refresh() {
    loadCategories();
  }

  useEffect(() => {
    setFormData((prev: any) => {
      return { ...prev, properties: JSON.stringify([...properties]) };
    });
  }, [properties]);

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    buildSelectionList(selectionList, categories, "", "بدون دسته بندی", null);
    if (categories.length) {
      loadOneProduct();
      loadPropertiesAndVals();
    }
  }, [categories]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await call(
      axios.put(
        SERVER_API + `/admin/dashboard/products/${productId}`,
        formData
      ),
      true
    );
    refresh();
  };

  return (
    <div>
      <h1>مشاهده یک محصول</h1>
      <div className="my-form my-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col gap-3 justify-center align-middle shadow-md p-3 rounded"
        >
          <input
            type="text"
            className="border rounded p-1"
            placeholder="نام محصول"
            name="name"
            value={formData?.name}
            onChange={handleChange}
          />
          <input
            type="text"
            className="border rounded p-1"
            placeholder="قیمت"
            name="price"
            value={formData?.price}
            onChange={handleChange}
          />
          <br />
          <DiscountManager
            discount={discount}
            setDiscount={setDiscount}
          ></DiscountManager>
          <br />
          <input
            type="text"
            className="border rounded p-1"
            placeholder="موجودی انبار"
            name="stock"
            value={formData?.stock}
            onChange={handleChange}
          />
          <select
            id="categoryId"
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="border"
            ref={selectionList}
          >
            {/* dynamic */}
          </select>
          {/* note:need to be modify for uploads */}
          <RichTextEditor
            editorRef={editorRef}
            formData={formData}
            setFormData={setFormData}
          ></RichTextEditor>
          <div className="flex flex-row items-center">
            <Img
              pic={selectedImgs[0]}
              sizes={"500px"}
              className={"aspect-square object-cover"}
              width={100}
            ></Img>
            <p
              className="cursor-pointer"
              onClick={() => {
                setLibShow(true);
              }}
            >
              افزودن تصویر محصول
            </p>
            {libShow ? (
              <Library
                setLibShow={setLibShow}
                selectedImgs={selectedImgs}
                setSelectedImgs={setSelectedImgs}
              ></Library>
            ) : null}
          </div>

          <br />

          <div className="flex flex-row items-center">
            {selectedGalleryImgs.map((img: any, index: any) => {
              return (
                <Img
                  pic={img}
                  sizes={"500px"}
                  className={"aspect-square object-cover"}
                  width={100}
                  key={index}
                ></Img>
              );
            })}
            <p
              className="cursor-pointer"
              onClick={() => {
                setGalleryLibShow(true);
              }}
            >
              گالری تصاویر محصول
            </p>
            {galleryLibShow ? (
              <Library
                setLibShow={setGalleryLibShow}
                selectedImgs={selectedGalleryImgs}
                setSelectedImgs={setSelectedGalleryImgs}
              ></Library>
            ) : null}
          </div>

          <button>بروزرسانی</button>
        </form>
        <PropertiesManager
          properties={properties}
          setProperties={setProperties}
          propertiesAndVals={propertiesAndVals}
        ></PropertiesManager>
      </div>
    </div>
  );
}
