"use client";

import callManager from "@/hooks/callManager";
import { useUserStore } from "@/store";
import { useEffect, useState } from "react";
import { SERVER_API } from "../../../../../../config";
import axios from "axios";
import Img from "@/components/img";
import useLoadBanners from "@/hooks/useLoadBanners";
import Library from "@/components/library";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function BannersPage() {
  const { call } = callManager();
  const { user } = useUserStore();
  const { banners, loadBanners } = useLoadBanners();
  const [libShow, setLibShow] = useState(false);
  const [selectedImgs, setSelectedImgs] = useState<any>([]);

  const [formData, setFormData] = useState<any>({
    image: "",
    location: "",
    show: false,
  });
  const [updateFormData, setUpdateFormData] = useState<any>();
  const [selectedBannerId, setSelectedBannerId] = useState<any>(null);

  async function refresh() {
    setFormData({
      image: "",
      location: "",
      show: false,
    });
    setSelectedImgs([]);
    loadBanners();
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdateChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setUpdateFormData({ ...formData, [e.target.name]: e.target.value });
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
    bannerId: any
  ) => {
    const response = await call(
      axios.delete(SERVER_API + `/admin/dashboard/page/banners/${bannerId}`),
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
        SERVER_API + `/admin/dashboard/page/banners/${selectedBannerId}`,
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
      axios.post(SERVER_API + "/admin/dashboard/page/banners", formData),
      true
    );
    refresh();
  };

  return (
    <div>
      <h1>مدیریت بنرها</h1>
      <br />
      <h4>لطفا بنر ها را با ابعاد مشابه ایجاد کنید تا باعث ناهماهنگی نشود</h4>
      <div className="bg-red-300">
        <form onSubmit={handleSubmit} className="flex-column">
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
              افزودن تصویر بنر
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
          <select
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="border"
          >
            <option value="">-- لطفاً انتخاب کنید --</option>
            <option value="main-banner">بنر اصلی</option>
            <option value="little-banner">بنر های کوچک</option>
          </select>
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
          <button>افزودن بنر</button>
        </form>
      </div>
      <div className="bg-blue-300">
        <button onClick={handleRefresh}>refresh</button>
        <table className="border">
          <caption>list of products</caption>
          <thead>
            <tr>
              <th className="border">image</th>
              <th className="border">وضعیت</th>
              <th className="border">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {banners?.map((banner: any, index: any) => {
              return (
                <tr key={index}>
                  <td className="border">
                    <Img
                      pic={banner?.image}
                      sizes={"500px"}
                      className={"aspect-square object-cover"}
                      width={100}
                    ></Img>
                  </td>
                  <td className="border">
                    {selectedBannerId === banner._id.toString() ? (
                      <form onSubmit={(e) => handleUpdate(e)}>
                        <select
                          name="location"
                          value={updateFormData.location}
                          onChange={handleUpdateChange}
                          className="border"
                        >
                          <option value="">-- لطفاً انتخاب کنید --</option>
                          <option value="main-banner">بنر اصلی</option>
                          <option value="little-banner">بنر های کوچک</option>
                        </select>
                        <br />
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
                        <p>{banner.show.toString()}</p>
                        <button
                          onClick={() => {
                            setUpdateFormData({
                              location: banner.location,
                              show: banner.show,
                            });
                            setSelectedBannerId(banner._id.toString());
                          }}
                        >
                          ویرایش
                        </button>
                      </>
                    )}
                  </td>
                  <td className="border">
                    <button
                      onClick={(e, bannerId = banner._id) => {
                        handleDelete(e, bannerId);
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
