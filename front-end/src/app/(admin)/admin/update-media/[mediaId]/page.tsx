"use client";

import Img from "@/components/img";
import { SERVER_API, SERVER_URL } from "../../../../../../config";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import callManager from "@/hooks/callManager";
import { useParams } from "next/navigation";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function UpdateMediaPage() {
  const { call } = callManager();
  const { mediaId } = useParams<{ mediaId: string }>();
  const [media, setMedia] = useState<any>();
  const [formData, setFormData] = useState<any>({
    selectedVersion: null,
    media: null,
  });

  const fileInputRef = useRef<any>(null);
  const versionInputRef = useRef<any>(null);

  async function loadOneMedia() {
    const response = await call(
      axios.get(SERVER_API + `/admin/dashboard/medias/${mediaId}`),
      false
    );
    setMedia({ ...response?.data?.data });
    setFormData({ selectedVersion: null, media: null });
    // Reset file input field
    fileInputRef.current ? (fileInputRef.current.value = "") : null;

    // Reset version input field
    versionInputRef.current ? (versionInputRef.current.value = "") : null;
  }

  useEffect(() => {
    mediaId && loadOneMedia();
  }, [mediaId]);

  const handleUpdateFileChange = (event: any) => {
    setFormData({ ...formData, media: event.target.files[0] });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dataToSend = new FormData();

    // Append all form fields to FormData
    Object.entries(formData).forEach(([key, value]: any) => {
      dataToSend.append(key, value);
    });

    if (formData.selectedVersion === "original") {
      const response = await call(
        axios.put(
          SERVER_API + `/admin/dashboard/medias/${mediaId}`,
          dataToSend
        ),
        true
      );
    }

    loadOneMedia();
  };

  return (
    <div>
      <h1>مشاهده یک رسانه</h1>
      <p>
        جایگزینی عکس فعلا فقط برای نسخه اورجینال در دسترس است . با جایگزینی نسخه
        اورجینال تمام نسحه ها از نو ساخته می شوند
      </p>
      <Img
        pic={media}
        sizes={"500px"}
        className={"aspect-square object-cover"}
        width={100}
      ></Img>
      <div className="bg-blue-300">
        <table className="border">
          <caption>نسخه های رسانه</caption>
          <thead>
            <tr>
              <th className="border">رسانه</th>
              <th className="border">جزئیات</th>
              <th className="border">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {media &&
              media.urls &&
              Object.entries(media.urls).map(
                ([urlObj, urlObjVal]: any, index: any) => {
                  return (
                    <tr key={index}>
                      <td className="border">
                        <img
                          src={SERVER_URL + urlObjVal.url}
                          alt=""
                          width={100}
                          className=""
                        />
                      </td>
                      <td className="border">
                        <span>سایز : {urlObj}</span>
                      </td>
                      <td className="border">
                        {urlObj === formData.selectedVersion ? (
                          <form onSubmit={(e) => handleSubmit(e)}>
                            <input
                              type="file"
                              name="media"
                              accept=".png,.jpg,.webp"
                              className="border"
                              onChange={handleUpdateFileChange}
                              ref={versionInputRef}
                            />
                            <button>ذخیره</button>
                          </form>
                        ) : (
                          <button
                            onClick={() => {
                              setFormData({
                                //note: for now its only for the original version that replace the whole media .
                                selectedVersion:
                                  urlObj === "original" ? urlObj : null,
                                media: null,
                              });
                            }}
                          >
                            عکس جایگزین
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                }
              )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
