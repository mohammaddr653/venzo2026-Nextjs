"use client";

import Img from "@/components/img";
import Library from "@/features/admin/components/library";
import axios from "axios";
import { SERVER_API } from "../../../../../config";
import { useEffect, useRef, useState } from "react";
import useLoadCategories from "@/hooks/useLoadCategories";
import { useUserStore } from "@/store";
import callManager from "@/hooks/callManager";
import { buildList } from "@/helpers/buildList";
import { buildSelectionList } from "@/helpers/buildSelectionList";
import { useRouter } from "next/navigation";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function CategoriesPage() {
  const { call } = callManager();
  const { categories, loadCategories } = useLoadCategories();
  const list = useRef<HTMLUListElement>(null);
  const selectionList = useRef<HTMLSelectElement>(null);
  const { user } = useUserStore();
  const router = useRouter();
  const [libShow, setLibShow] = useState(false);
  const [selectedImgs, setSelectedImgs] = useState<any>([]);
  const [formData, setFormData] = useState({
    name: "",
    motherId: "",
    type: "",
    link: "",
    img: "",
    display: "ordinary",
  });

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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  async function refresh() {
    setFormData({
      name: "",
      motherId: "",
      type: "",
      link: "",
      img: "",
      display: "ordinary",
    });
    setSelectedImgs([]);
    loadCategories();
  }

  useEffect(() => {
    refresh();
  }, []);

  //نوع دسته بندی مادر بطور پیشفرض به عنوان نوع دسته بندی جدید قرار میگیرد
  useEffect(() => {
    const motherCat = categories.find((item) => item._id === formData.motherId);
    if (motherCat) setFormData({ ...formData, type: motherCat.type });
  }, [formData.motherId]);

  useEffect(() => {
    buildList(list, categories, handleDelete, handleUpdate, false, null, null);
    buildSelectionList(selectionList, categories, "", "دسته بندی مادر", null);
  }, [categories]);

  const handleDelete = async (categoryId: any) => {
    const response = await call(
      axios.delete(SERVER_API + `/admin/dashboard/categories/${categoryId}`),
      true
    );
    refresh();
  };

  const handleUpdate = async (categoryId: any) => {
    router.push(`/admin/update-category/${categoryId}`);
  };

  const handleRefresh = () => {
    refresh();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/categories", formData),
      true
    );
    refresh();
  };

  return (
    <div>
      <h1>مدیریت دسته بندی ها</h1>
      <div className="bg-red-300">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="name"
            className="border"
            value={formData.name}
            onChange={handleChange}
          />
          <select
            id="motherId"
            name="motherId"
            value={formData.motherId}
            onChange={handleChange}
            className="border"
            ref={selectionList}
          >
            {/* dynamic */}
          </select>
          <br />
          <select
            id="type"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="border"
          >
            <option value="">انتخاب کنید</option>
            <option value="box">باکس</option>
            <option value="link">لینک</option>
            <option value="shop">فروشگاه</option>
            <option value="archive">آرشیو</option>
          </select>
          <br />
          <h4>آدرس لینک تنها برای دسته بندی های نوع لینک بکار می آید</h4>
          <input
            type="text"
            name="link"
            placeholder="link"
            value={formData.link}
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

          <button>ساخت دسته بندی</button>
        </form>
      </div>
      <div className="bg-blue-300">
        <button onClick={handleRefresh}>refresh</button>
        <h1>لیست دسته بندی ها</h1>
        <ul className="bg-green-300 p-2" ref={list}>
          {/* dynamic */}
        </ul>
      </div>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
}
