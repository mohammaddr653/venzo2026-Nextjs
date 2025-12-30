"use client";

import axios from "axios";
import { SERVER_API } from "../../../../../config";
import { useEffect, useRef, useState } from "react";
import { buildSelectionList } from "@/helpers/buildSelectionList";
import useLoadPropertiesAndVals from "@/hooks/useLoadPropertiesAndVals";
import { useUserStore } from "@/store";
import callManager from "@/hooks/callManager";
import useLoadCategories from "@/hooks/useLoadCategories";
import useLoadProducts from "@/hooks/useLoadProducts";
import DiscountManager from "@/features/admin/components/discountManager";
import RichTextEditor from "@/features/admin/components/rich-text-editor";
import Img from "@/components/img";
import Library from "@/features/admin/components/library";
import PropertiesManager from "@/features/admin/components/propertiesManager";
import { ProductPropertiesObj } from "@/features/admin/types/properties";
import { NewProductFormData } from "@/features/admin/types/newProductFormData";
import { useRouter } from "next/navigation";
import TitleRight from "@/components/title-right";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function ProductsPage() {
  const { call } = callManager();
  const { user } = useUserStore();
  const { propertiesAndVals, loadPropertiesAndVals } =
    useLoadPropertiesAndVals();
  const [libShow, setLibShow] = useState(false);
  const [selectedImgs, setSelectedImgs] = useState<any>([]);
  const [galleryLibShow, setGalleryLibShow] = useState(false);
  const [selectedGalleryImgs, setSelectedGalleryImgs] = useState<any>([]);
  const { products, loadProducts } = useLoadProducts();
  const { categories, loadCategories } = useLoadCategories();
  const selectionList = useRef<HTMLSelectElement>(null);
  const router = useRouter();

  const [formData, setFormData] = useState<NewProductFormData>({
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
  const [discount, setDiscount] = useState<any>(null);

  const editorRef = useRef<any>(null);

  useEffect(() => {
    const safeProperties = properties.filter((item: any) => item.values.length);
    setFormData((prev: any) => {
      return {
        ...prev,
        properties: JSON.stringify([...safeProperties]),
      };
    });
  }, [properties]);

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

  useEffect(() => {
    buildSelectionList(selectionList, categories, "", "بدون دسته بندی", null);
  }, [categories]);

  async function loadProductsAndCats() {
    setFormData({
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
    setSelectedImgs([]);
    setSelectedGalleryImgs([]);
    setDiscount(null);
    setProperties([]);
    loadCategories();
    loadProducts();
    loadPropertiesAndVals();
  }

  useEffect(() => {
    loadProductsAndCats();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: any
  ) => {
    const response = await call(
      axios.delete(SERVER_API + `/admin/dashboard/products/${productId}`),
      true
    );
    loadProductsAndCats();
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement>,
    productId: any
  ) => {
    router.push(`/admin/update-product/${productId}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/products", formData),
      true
    );
    loadProductsAndCats();
  };

  return (
    <div>
      <TitleRight title="مدیریت محصولات" className={"text-wrap"}></TitleRight>
      <div className="flex items-start gap-5">
        <div className="bg-neutral-100 p-2">
          <form id="newProduct" onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="نام محصول"
              name="name"
              value={formData.name}
              className="border rounded p-1"
              onChange={handleChange}
            />
            <input
              type="text"
              placeholder="قیمت"
              name="price"
              value={formData.price}
              className="border rounded p-1"
              onChange={handleChange}
            />
            <DiscountManager
              discount={discount}
              setDiscount={setDiscount}
            ></DiscountManager>
            <input
              type="text"
              placeholder="موجودی انبار"
              name="stock"
              value={formData.stock}
              className="border rounded p-1"
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
            <PropertiesManager
              properties={properties}
              setProperties={setProperties}
              propertiesAndVals={propertiesAndVals}
            ></PropertiesManager>
            <button className="bg-green-500 rounded-md text-neutral-50 p-2 w-50">افزودن محصول</button>
          </form>
        </div>
        <div className="bg-neutral-100 flex flex-col gap-5 p-2 grow">
          <div className="flex justify-between items-center">
            <p>لیست محصولات</p>
          </div>
          <table className="cu-records-table w-full text-sm">
            <thead>
              <tr>
                <th className="border">تصویر</th>
                <th className="border">نام</th>
                <th className="border">قیمت</th>
                <th className="border">موجودی</th>
                <th className="border">دسته بندی</th>
                <th className="border">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((product: any, index: any) => {
                return (
                  <tr key={index}>
                    <td className="border">
                      <Img
                        pic={product?.img}
                        sizes={"100px"}
                        className={"aspect-square object-cover"}
                        width={100}
                      ></Img>
                    </td>
                    <td className="border">{product.name}</td>
                    <td className="border">{product.price}</td>
                    <td className="border">{product.stock}</td>
                    <td className="border">
                      {product.categoryId
                        ? categories.map((category: any) => {
                            return category._id === product.categoryId
                              ? category.name
                              : null;
                          })
                        : "بدون دسته بندی"}
                    </td>
                    <td className="border">
                      <div className="flex gap-2">
                        <button
                          className="bg-red-400 rounded-md p-1"
                          onClick={(e, productId = product._id) => {
                            handleDelete(e, productId);
                          }}
                        >
                          حذف
                        </button>
                        <button
                          className="bg-yellow-400 rounded-md p-1"
                          onClick={(e, productId = product._id) => {
                            handleUpdate(e, productId);
                          }}
                        >
                          ویرایش
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
