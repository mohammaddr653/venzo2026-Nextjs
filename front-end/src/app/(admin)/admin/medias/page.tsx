"use client";

import callManager from "@/hooks/callManager";
import useLoadMedias from "@/hooks/useLoadMedias";
import { useUserStore } from "@/store";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { SERVER_API } from "../../../../../config";
import Img from "@/components/img";
import { useRouter } from "next/navigation";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function MediasPage() {
  const { call } = callManager();
  const { user } = useUserStore();
  const router = useRouter();
  const { medias, loadMedias } = useLoadMedias();

  const [formData, setFormData] = useState<any>({
    media: [],
  });

  const fileInputRef = useRef<any>(null);

  async function refresh() {
    setFormData({
      media: [],
    });
    // Reset file input field
    fileInputRef.current ? (fileInputRef.current.value = "") : null;

    loadMedias();
  }

  useEffect(() => {
    refresh();
  }, []);

  const handleFileChange = (event: any) => {
    setFormData({ ...formData, media: event.target.files });
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    mediaId: any
  ) => {
    const response = await call(
      axios.delete(SERVER_API + `/admin/dashboard/medias/${mediaId}`),
      true
    );
    refresh();
  };

  const handleUpdate = async (mediaId: any) => {
    router.push(`/admin/update-media/${mediaId}`);
  };

  const handleRefresh = () => {
    refresh();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const dataToSend = new FormData();

    // Append all form fields to FormData
    Object.entries(formData).forEach(([key, value]: any) => {
      if (key === "media") {
        for (let file of value) {
          dataToSend.append(key, file);
        }
      } else {
        dataToSend.append(key, value);
      }
    });
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/medias", dataToSend),
      true
    );
    refresh();
  };

  return (
    <div>
      <h1>مدیریت رسانه ها</h1>
      <br />
      <div className="bg-red-300">
        <form onSubmit={handleSubmit} className="flex-column">
          <input
            type="file"
            name="media"
            accept=".png,.jpg"
            className="border"
            multiple={true}
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <br />
          <button>افزودن رسانه</button>
        </form>
      </div>
      <div className="bg-blue-300">
        <button onClick={handleRefresh}>refresh</button>
        <table className="border">
          <caption>list of medias</caption>
          <thead>
            <tr>
              <th className="border">رسانه</th>
              <th className="border">جزئیات</th>
              <th className="border">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {medias?.map((media: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="border">
                    <Img
                      pic={media}
                      sizes={"500px"}
                      className={"aspect-square object-cover"}
                      width={100}
                    ></Img>
                  </td>
                  <td className="border">
                    <button
                      onClick={() => {
                        handleUpdate(media._id);
                      }}
                    >
                      ویرایش
                    </button>
                  </td>
                  <td className="border">
                    <button
                      onClick={(e, mediaId = media._id) => {
                        handleDelete(e, mediaId);
                      }}
                    >
                      حذف
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
        this is zustand , hello{user ? user.name : " product"}
      </div>
    </div>
  );
}
