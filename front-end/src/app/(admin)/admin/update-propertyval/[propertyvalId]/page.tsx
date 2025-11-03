"use client";

import axios from "axios";
import { SERVER_API } from "../../../../../../config";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUserStore } from "@/store";
import callManager from "@/hooks/callManager";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function UpdatePropertyvalPage() {
  const { call } = callManager();
  const { user } = useUserStore();
  const [formData, setFormData] = useState({
    value: "",
  });
  const { propertyvalId } = useParams<{ propertyvalId: string }>();

  async function loadOnePropertyval() {
    const response = await call(
      axios.get(SERVER_API + `/admin/dashboard/propertyvals/${propertyvalId}`),
      false
    );
    const matchedProperty = response.data.data;
    setFormData({
      ...formData,
      value: matchedProperty.value,
    });
  }

  useEffect(() => {
    loadOnePropertyval();
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
        SERVER_API + `/admin/dashboard/propertyvals/${propertyvalId}`,
        formData
      ),
      true
    );
    loadOnePropertyval();
  };
  return (
    <div>
      <h1>صفحه ویرایش مقدار ویژگی</h1>
      <div className="my-form my-3">
        <form
          onSubmit={handleSubmit}
          className="bg-white flex flex-col gap-3 justify-center align-middle shadow-md p-3 rounded"
        >
          <input
            type="text"
            className="border rounded p-3"
            placeholder="value"
            name="value"
            value={formData?.value}
            onChange={handleChange}
          />
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
