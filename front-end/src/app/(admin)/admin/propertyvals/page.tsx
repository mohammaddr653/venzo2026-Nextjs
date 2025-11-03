"use client";

import callManager from "@/hooks/callManager";
import { useUserStore } from "@/store";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { SERVER_API } from "../../../../../config";
import axios from "axios";

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
      <h1>مدیریت مقدار های {property?.name}</h1>
      <div className="bg-red-300">
        <form onSubmit={handleSubmit} className="flex-column">
          <input
            type="text"
            placeholder="value"
            name="value"
            value={formData.value}
            className="border"
            onChange={handleChange}
          />
          <br />
          {property?.type === "color" ? (
            <>
              <h3>
                نوع نمایش این ویژگی "رنگ" است . پس مقدار هگزادیسیمال رنگ را
                تعیین کنید
              </h3>
              <input
                type="text"
                placeholder="hex"
                name="hex"
                value={formData.hex}
                className="border"
                onChange={handleChange}
              />
            </>
          ) : null}
          <button>افزودن مقدار ویژگی</button>
        </form>
      </div>
      <div className="bg-blue-300">
        <button onClick={handleRefresh}>refresh</button>
        <table className="border">
          <caption>list of properties</caption>
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
                    {propertyval.value}

                    {propertyval.hex ? (
                      <>
                        <br />
                        {propertyval.hex}
                      </>
                    ) : null}
                  </td>
                  <td className="border">
                    <button
                      onClick={(e) => {
                        handleDelete(e, propertyval._id);
                      }}
                    >
                      حذف
                    </button>
                    <button
                      onClick={(e) => {
                        handleUpdate(e, propertyval._id);
                      }}
                    >
                      ویرایش
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="bg-sky-600">this is tailwind</div>
      <div className="bg-sky-300">
        this is zustand , hello{user ? user.name : " user"}
      </div>
    </div>
  );
}
