"use client";

import Img from "@/components/img";
import Library from "@/features/admin/components/library";
import { SERVER_API } from "../../../../../../config";
import axios from "axios";
import { useEffect, useState } from "react";
import useLoadTrusts from "@/hooks/useLoadTrusts";
import { useUserStore } from "@/store";
import callManager from "@/hooks/callManager";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function TrustsPage() {
  const { call } = callManager();
  const { user } = useUserStore();
  const { trusts, loadTrusts } = useLoadTrusts();
  const [libShow, setLibShow] = useState(false);
  const [selectedImgs, setSelectedImgs] = useState<any>([]);

  const [formData, setFormData] = useState<any>({
    image: "",
    title: "",
    caption: "",
    show: false,
  });
  const [updateFormData, setUpdateFormData] = useState<any>();
  const [selectedTrustId, setSelectedTrustId] = useState<any>(null);

  async function refresh() {
    setFormData({
      image: "",
      title: "",
      caption: "",
      show: false,
    });
    setSelectedImgs([]);
    loadTrusts();
  }

  useEffect(() => {
    refresh();
  }, []);

  useEffect(() => {
    if (selectedImgs.length) {
      setFormData((prev: any) => {
        return { ...prev, image: selectedImgs[0]._id };
      });
    } else {
      setFormData((prev: any) => {
        return { ...prev, image: "" };
      });
    }
  }, [selectedImgs]);

  const handleFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const handleUpdateFormChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setUpdateFormData({ ...updateFormData, [e.target.name]: e.target.value });
  };

  const handleShowChange = (event: any) => {
    if (event.target.name === "active" && event.target.checked) {
      setFormData({ ...formData, show: true });
    }
    if (event.target.name === "deactive" && event.target.checked) {
      setFormData({ ...formData, show: false });
    }
  };

  const handleDelete = async (
    e: React.MouseEvent<HTMLButtonElement>,
    trustId: any
  ) => {
    const response = await call(
      axios.delete(SERVER_API + `/admin/dashboard/page/trusts/${trustId}`),
      true
    );
    refresh();
  };

  const updateShowState = (e: any) => {
    if (e.target.name === "active" && e.target.checked) {
      setUpdateFormData({ ...updateFormData, show: true });
    }
    if (e.target.name === "deactive" && e.target.checked) {
      setUpdateFormData({ ...updateFormData, show: false });
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.put(
        SERVER_API + `/admin/dashboard/page/trusts/${selectedTrustId}`,
        updateFormData
      ),
      true
    );
    refresh();
  };

  const handleRefresh = () => {
    refresh();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await call(
      axios.post(SERVER_API + "/admin/dashboard/page/trusts", formData),
      true
    );
    refresh();
  };

  return (
    <div>
      <h1>مدیریت اعتماد ها</h1>
      <br />
      <h4>
        لطفا تصویر اعتماد ها را با ابعاد مشابه ایجاد کنید تا باعث ناهماهنگی نشود
      </h4>
      <div className="bg-red-300">
        <form onSubmit={handleSubmit} className="flex-column">
          <input
            type="text"
            placeholder="title"
            name="title"
            value={formData.title}
            className="border"
            onChange={handleFormChange}
          />
          <input
            type="text"
            placeholder="caption"
            name="caption"
            value={formData.caption}
            className="border"
            onChange={handleFormChange}
          />
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
              افزودن تصویر اعتماد
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
          <label>
            <input
              type="radio"
              name="active"
              checked={formData.show}
              onChange={(e) => handleShowChange(e)}
            />
            فعال
          </label>
          <br />
          <label>
            <input
              type="radio"
              name="deactive"
              checked={!formData.show}
              onChange={(e) => handleShowChange(e)}
            />
            غیرفعال
          </label>
          <br />
          <button>افزودن اعتماد</button>
        </form>
      </div>
      <div className="bg-blue-300">
        <button onClick={handleRefresh}>refresh</button>
        <table className="border">
          <caption>list of products</caption>
          <thead>
            <tr>
              <th className="border">image</th>
              <th className="border">جزئیات</th>
              <th className="border">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {trusts?.map((trust: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="border">
                    <Img
                      pic={trust?.image}
                      sizes={"500px"}
                      className={"aspect-square object-cover"}
                      width={100}
                    ></Img>
                  </td>
                  <td className="border">
                    {selectedTrustId === trust._id.toString() ? (
                      <form onSubmit={(e) => handleUpdate(e)}>
                        <input
                          type="text"
                          placeholder="title"
                          name="title"
                          value={updateFormData.title}
                          className="border"
                          onChange={handleUpdateFormChange}
                        />
                        <input
                          type="text"
                          placeholder="caption"
                          name="caption"
                          value={updateFormData.caption}
                          className="border"
                          onChange={handleUpdateFormChange}
                        />
                        <label>
                          <input
                            type="radio"
                            name="active"
                            checked={updateFormData.show}
                            onChange={(e) => updateShowState(e)}
                          />
                          فعال
                        </label>
                        <br />
                        <label>
                          <input
                            type="radio"
                            name="deactive"
                            checked={!updateFormData.show}
                            onChange={(e) => updateShowState(e)}
                          />
                          غیرفعال
                        </label>
                        <button>اعمال</button>
                      </form>
                    ) : (
                      <>
                        <p>{trust.show.toString()}</p>
                        <button
                          onClick={() => {
                            setUpdateFormData({
                              title: trust.title,
                              caption: trust.caption,
                              show: trust.show,
                            });
                            setSelectedTrustId(trust._id.toString());
                          }}
                        >
                          ویرایش
                        </button>
                      </>
                    )}
                  </td>
                  <td className="border">
                    <button
                      onClick={(e, trustId = trust._id) => {
                        handleDelete(e, trustId);
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
