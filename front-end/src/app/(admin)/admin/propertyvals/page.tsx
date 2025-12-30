"use client";

import callManager from "@/hooks/callManager";
import { useUserStore } from "@/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SERVER_API } from "../../../../../config";
import axios from "axios";
import TitleRight from "@/components/title-right";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function PropertyvalsPage() {
  const { call } = callManager();
  const { user } = useUserStore();
  const [propertyvals, setPropertyvals] = useState<any>([]);
  const searchParams = useSearchParams();
  const [property, setProperty] = useState<any>(null);
  const [formData, setFormData] = useState({
    propertyId: "",
    value: "",
    hex: "",
  });
  const router = useRouter();

  useEffect(() => {
    const propertyParam = searchParams.get("property");
    if (propertyParam) {
      setProperty(JSON.parse(propertyParam));
    }
  }, [searchParams]);

  async function loadPropertyvals() {
    if (!property) return;
    setFormData({
      propertyId: property._id,
      value: "",
      hex: "",
    });
    const response = await call(
      axios.get(
        SERVER_API + `/admin/dashboard/propertyvals/filter/${property._id}`
      ),
      false
    );
    setPropertyvals([...response.data.data]);
  }

  useEffect(() => {
    if (property) loadPropertyvals();
  }, [property]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    propertyvalId: any
  ) => {
    const response = await call(
      axios.delete(
        SERVER_API + `/admin/dashboard/propertyvals/${propertyvalId}`
      ),
      true
    );
    loadPropertyvals();
  };

  const handleUpdate = async (
    e: React.MouseEvent<HTMLButtonElement>,
    propertyvalId: any
  ) => {
    router.push(`/admin/update-propertyval/${propertyvalId}`);
  };

  const handleRefresh = () => {
    loadPropertyvals();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/propertyvals", formData),
      true
    );
    loadPropertyvals();
  };

  return (
    <div>
      <TitleRight
        title={`مدیریت مقدار های ${property?.name}`}
        className={"text-wrap"}
      ></TitleRight>
      <div className="flex items-start gap-5 mt-5">
        <div className="bg-neutral-100 p-2">
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <input
              type="text"
              placeholder="value"
              name="value"
              value={formData.value}
              className="border rounded p-1"
              onChange={handleChange}
            />
            {property?.type === "color" ? (
              <>
                <h3>
                  نوع نمایش این ویژگی "رنگ" است . پس مقدار هگزادیسیمال رنگ را
                  تعیین کنید
                </h3>
                <input
                  type="text"
                  placeholder="مقدار هگزادسیمال "
                  name="hex"
                  value={formData.hex}
                  className="border rounded p-1"
                  onChange={handleChange}
                />
              </>
            ) : null}
            <button className="bg-green-500 rounded-md text-neutral-50 p-2 w-50">
              افزودن مقدار ویژگی
            </button>
          </form>
        </div>
        <div className="bg-neutral-100 flex flex-col gap-5 p-2 grow">
          <div className="flex justify-between items-center">
            <p>لیست مقادیر {property?.name}</p>
          </div>
          <table className="cu-records-table w-full text-sm">
            <thead>
              <tr>
                <th className="border">مقدار ویژگی</th>
                <th className="border">عملیات</th>
              </tr>
            </thead>
            <tbody>
              {propertyvals?.map((propertyval: any, index: any) => {
                return (
                  <tr key={index}>
                    <td className="border">
                      <div className="flex flex-col gap-2">
                        <p className="text-green-700 font-bold">
                          {propertyval.value}
                        </p>
                        {propertyval.hex ? (
                          <span className=" text-neutral-700 text-xs rounded-md">
                            {propertyval.hex}
                          </span>
                        ) : null}
                      </div>
                    </td>
                    <td className="border">
                      <div className="flex gap-2">
                        <button
                          className="bg-red-400 rounded-md p-1"
                          onClick={(e) => {
                            handleDelete(e, propertyval._id);
                          }}
                        >
                          حذف
                        </button>
                        <button
                          className="bg-yellow-400 rounded-md p-1"
                          onClick={(e) => {
                            handleUpdate(e, propertyval._id);
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
