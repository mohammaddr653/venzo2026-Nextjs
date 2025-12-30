"use client";

import callManager from "@/hooks/callManager";
import { useEffect, useState } from "react";
import { SERVER_API } from "../../../../../config";
import axios from "axios";
import { useRouter } from "next/navigation";
import TitleRight from "@/components/title-right";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function PropertiesPage() {
  const { call } = callManager();
  const [properties, setProperties] = useState<any>([]);
  const [formData, setFormData] = useState({
    name: "",
    specifiedVals: "true",
    type: "ordinary",
  });
  const router = useRouter();

  async function loadProperties() {
    setFormData({
      name: "",
      specifiedVals: "true",
      type: "ordinary",
    });
    const response = await call(
      axios.get(SERVER_API + "/admin/dashboard/properties"),
      false
    );
    setProperties([...response.data.data]);
  }

  useEffect(() => {
    loadProperties();
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
    propertyId: any
  ) => {
    const response = await call(
      axios.delete(SERVER_API + `/admin/dashboard/properties/${propertyId}`),
      true
    );
    loadProperties();
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement>,
    propertyId: any
  ) => {
    router.push(`/admin/update-property/${propertyId}`);
  };

  const handleManagment = async (
    e: React.MouseEvent<HTMLButtonElement>,
    property: any
  ) => {
    router.push(`/admin/propertyvals?property=${JSON.stringify(property)}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/properties", formData),
      true
    );
    loadProperties();
  };

  return (
    <div>
      <TitleRight title="مدیریت ویژگی ها" className={"text-wrap"}></TitleRight>
      <div className="flex items-start gap-5 mt-5">
        <div className="bg-neutral-100 p-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="نام ویژگی"
              name="name"
              value={formData.name}
              className="border rounded p-1"
              onChange={handleChange}
            />
            <label>
              <input
                type="radio"
                name="specifiedVals"
                value="true"
                checked={formData.specifiedVals === "true" ? true : false}
                onChange={handleChange}
              />
              مقادیر مشخص
            </label>
            <label>
              <input
                type="radio"
                name="specifiedVals"
                value="false"
                checked={formData.specifiedVals === "false" ? true : false}
                onChange={handleChange}
              />
              مقادیر متغیر
            </label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="border"
            >
              <option value="">-- لطفاً انتخاب کنید --</option>
              <option value="ordinary">نمایش عادی</option>
              <option value="color">نمایش رنگ</option>
            </select>
            <button className="bg-green-500 text-white rounded-md p-2">
              افزودن ویژگی
            </button>
          </form>
        </div>
        <div className="bg-neutral-100 flex flex-col gap-5 p-2 grow">
          <div className="flex justify-between items-center">
            <p>لیست ویژگی ها</p>
          </div>
          <table className="cu-records-table w-full text-sm">
            <thead>
              <tr>
                <th className="border">نام ویژگی</th>
                <th className="border">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {properties?.map((property: any, index: any) => {
                return (
                  <tr key={index}>
                    <td className="border">
                      <div className="flex flex-col gap-2 items-start">
                        <p className="text-green-700 font-bold">
                          {property.name}
                        </p>
                        <div className="flex gap-2 items-center">
                          {property.type !== "" ? (
                            <span className=" text-neutral-700 text-xs rounded-md">
                              نوع نمایش: {property.type}
                            </span>
                          ) : null}
                          <span className=" text-neutral-700 text-xs rounded-md">
                            {property.specifiedVals
                              ? "مقادیر مشخص"
                              : "مقادیر متغیر"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="border">
                      <div className="flex gap-1 items-center">
                        <button
                          className="bg-red-400 rounded-md p-1"
                          onClick={(e, propertyId = property._id) => {
                            handleDelete(e, propertyId);
                          }}
                        >
                          حذف
                        </button>
                        <button
                          className="bg-yellow-400 rounded-md p-1"
                          onClick={(e, propertyId = property._id) => {
                            handleUpdate(e, propertyId);
                          }}
                        >
                          ویرایش
                        </button>
                        {property.specifiedVals ? (
                          <button
                            className="p-1 text-xs border bg-sky-400 text-white rounded-md"
                            onClick={(e) => {
                              handleManagment(e, property);
                            }}
                          >
                            مدیریت پیکره بندی
                          </button>
                        ) : null}
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
