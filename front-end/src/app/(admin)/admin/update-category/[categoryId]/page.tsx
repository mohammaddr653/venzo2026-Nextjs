"use client";

import Img from "@/components/img";
import Library from "@/components/library";
import { buildSelectionList } from "@/helpers/buildSelectionList";
import callManager from "@/hooks/callManager";
import { useUserStore } from "@/store";
import { useEffect, useRef, useState } from "react";
import { SERVER_API } from "../../../../../../config";
import axios from "axios";
import useLoadCategories from "@/hooks/useLoadCategories";
import { useParams } from "next/navigation";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function UpdateCategoryPage() {
  const { call } = callManager();
  const { categoryId } = useParams<{categoryId:string}>();
  const { categories, loadCategories } = useLoadCategories();
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    name: "",
    motherId: "",
    type: "",
    link: "",
    img: "",
    display: "",
  });
  const selectionList = useRef<HTMLSelectElement>(null);
  const [libShow, setLibShow] = useState(false);
  const [selectedImgs, setSelectedImgs] = useState<any>([]);

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
    buildSelectionList(
      selectionList,
      categories,
      "root",
      "دسته بندی مادر",
      categoryId
    );
  }, [categories]);

  async function loadOneCategory() {
    const response = await call(
      axios.get(SERVER_API + `/admin/dashboard/categories/${categoryId}`),
      false
    );
    const matchedCategory = response.data.data;
    setFormData({
      ...formData,
      name: matchedCategory.name,
      motherId: matchedCategory.motherId,
      type: matchedCategory.type,
      link: matchedCategory.link,
      display: matchedCategory.display,
    });
    if (matchedCategory.img)
      setSelectedImgs((prev: any) => {
        return [...prev, matchedCategory.img];
      });
  }
  useEffect(() => {
    if (!categories.length) {
      loadCategories();
    }
    loadOneCategory();
  }, []);

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
        SERVER_API + `/admin/dashboard/categories/${categoryId}`,
        formData
      ),
      true
    );
  };

  return (
    <div>
      <h1>مشاهده یک دسته بندی</h1>
      <div className="my-form my-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col gap-3 justify-center align-middle shadow-md p-3 rounded"
        >
          <input
            type="text"
            className="border rounded p-3"
            placeholder="name"
            name="name"
            value={formData?.name}
            onChange={handleChange}
          />
          <select
            id="motherId"
            name="motherId"
            value={formData?.motherId}
            onChange={handleChange}
            className="border"
            ref={selectionList}
          >
            {categories?.map((category: any, index: any) => {
              if (category._id !== categoryId) {
                return (
                  <option key={index} value={category._id}>
                    {category.name}
                  </option>
                );
              }
            })}
          </select>
          <select
            id="type"
            name="type"
            value={formData?.type}
            onChange={handleChange}
            className="border"
          >
            <option value="">انتخاب کنید</option>
            <option value="box">باکس</option>
            <option value="link">لینک</option>
            <option value="shop">فروشگاه</option>
            <option value="archive">آرشیو</option>
          </select>
          <h4>آدرس لینک تنها برای دسته بندی های نوع لینک بکار می آید</h4>
          <input
            type="text"
            name="link"
            placeholder="link"
            value={formData?.link}
            className="border"
            onChange={handleChange}
          />
          <br />
          <p>نمایش</p>
          <select
            name="display"
            value={formData.display}
            onChange={handleChange}
            className="border"
          >
            <option value="ordinary">عادی</option>
            <option value="mega-menu">مگامنو</option>
          </select>
          <br />
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
              افزودن تصویر دسته بندی
            </p>
            {libShow ? (
              <Library
                setLibShow={setLibShow}
                selectedImgs={selectedImgs}
                setSelectedImgs={setSelectedImgs}
              ></Library>
            ) : null}
          </div>

          <button>بروزرسانی</button>
        </form>
      </div>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
}
