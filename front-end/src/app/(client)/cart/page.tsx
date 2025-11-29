"use client";
import callManager from "@/hooks/callManager";
import axios from "axios";
import { useEffect, useState } from "react";
import { SERVER_API } from "../../../../config";
import Link from "next/link";
import Img from "@/components/img";
import PriceUnit from "@/components/priceUnit";
import Offpercent from "@/features/products/components/offpercent";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function CartPage() {
  const [reservedProducts, setReservedProducts] = useState<any[]>([]);
  const [totalPrice, setTotalPrice] = useState(null);
  const { call } = callManager();

  const formSchema = z.object({
    name: z.string().min(1),
    phone: z.string().min(1),
    province: z.string().min(1),
    city: z.string().min(1),
    address: z.string().min(1),
    postalCode: z.string().min(1),
    note: z.string(),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: "onChange",
  });

  async function loadCart() {
    const response = await call(axios.get(SERVER_API + "/cart"), false);
    setReservedProducts([...response.data.data.reservedProducts]);
    setTotalPrice(response.data.data.totalPrice);
  }

  useEffect(() => {
    loadCart();
  }, []);

  async function handleIncrement(e: React.FormEvent, id: string) {
    e.preventDefault();
    const response = await call(
      axios.put(SERVER_API + `/cart/plus/${id}`),
      true
    );
    loadCart();
  }

  async function handleDecrement(e: React.FormEvent, id: string) {
    e.preventDefault();
    const response = await call(
      axios.put(SERVER_API + `/cart/minus/${id}`),
      true
    );
    loadCart();
  }

  async function handleDelete(e: React.FormEvent, id: string) {
    e.preventDefault();
    const response = await call(
      axios.delete(SERVER_API + `/cart/delete/${id}`),
      true
    );
    reset();
    loadCart();
  }

  async function postData(data: any) {
    //ساخت سفارش جدید و بلافاصله انتقال به درگاه
    const createOrder = await call(
      axios.post(SERVER_API + "/orders", data),
      false
    );
    if (createOrder?.data?.data) {
      const response = await call(
        axios.post(SERVER_API + `/pay/${createOrder.data.data}`),
        true
      );
      if (response?.data?.data)
        window.location.href = `https://sandbox.zarinpal.com/pg/StartPay/${response.data.data}`; //انتقال به صفحه پرداخت
    }
    loadCart();
  }

  return (
    <>
      <main>
        <div className="cartpage-container flex flex-col gap-5 py-20">
          <h1 className="px-5 md:px-20">سبد خرید</h1>
          {reservedProducts?.length ? (
            <div className="grid grid-cols-3 px-5 md:px-20 gap-5">
              <div className="flex flex-col gap-2 col-span-3 md:col-span-2">
                <div className="flex flex-col rounded-md border-2 border-neutral-200 overflow-hidden">
                  {reservedProducts?.map((product: any, index: any) => {
                    return (
                      <div
                        key={index}
                        className={`flex flex-col md:flex-row justify-between p-2 py-3 ${
                          index + 1 !== reservedProducts.length &&
                          "border-b border-neutral-200"
                        }`}
                      >
                        <Link
                          href={`/single-shop/${product._id}`}
                          className="flex gap-2"
                        >
                          <Img
                            pic={product?.img}
                            alt={"product-image"}
                            loading="lazy"
                            className={"aspect-square object-cover rounded-md"}
                            width={100}
                            height={100}
                            sizes={`100px`}
                          ></Img>
                          <div>
                            {product.name}
                            {product.selectedPropertyvalString !== "" &&
                              product.properties
                                .find((item: any) => item.selective)
                                .values.map((propertyval: any, index: any) => {
                                  if (
                                    product.selectedPropertyvalString.includes(
                                      propertyval.propertyval._id
                                    )
                                  )
                                    return (
                                      <p
                                        key={index}
                                        className="bg-amber-400 text-black"
                                      >
                                        {propertyval.propertyval.value}
                                      </p>
                                    );
                                })}
                          </div>
                        </Link>
                        <div className="flex flex-row md:flex-col gap-2 justify-between items-end md:items-center">
                          <div className="flex flex-col justify-start items-start md:items-center">
                            <div className="flex flex-row items-center h-fit gap-1">
                              <div className="border border-neutral-300 rounded-md flex gap-3 h-fit flex-nowrap">
                                <form
                                  onSubmit={(e) =>
                                    handleIncrement(e, product._id)
                                  }
                                >
                                  <button className="px-2 cursor-pointer">
                                    +
                                  </button>
                                </form>
                                <span className="block text-amber-950">
                                  {product.count}
                                </span>
                                <form
                                  onSubmit={(e) =>
                                    handleDecrement(e, product._id)
                                  }
                                >
                                  <button className="px-2 cursor-pointer">
                                    -
                                  </button>
                                </form>
                              </div>
                              <form
                                onSubmit={(e) => handleDelete(e, product._id)}
                              >
                                <button className="p-2 cursor-pointer">
                                  ❌
                                </button>
                              </form>
                            </div>
                            <div className="text-size13 font-weight200 text-neutral-500">
                              <span>
                                {product.discount
                                  ? product.discount.offer
                                  : product.price}
                                <PriceUnit></PriceUnit>
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row-reverse gap-1 text-size15 font-weight300 text-neutral-700">
                            <span>
                              {(product.discount
                                ? product.discount.offer
                                : product.price) * product.count}
                              <PriceUnit></PriceUnit>
                            </span>
                            {product.discount && (
                              <Offpercent
                                percent={Math.round(
                                  ((product.price - product.discount.offer) *
                                    100) /
                                    product.price
                                )}
                              ></Offpercent>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="p-5 flex flex-col gap-4 rounded-md border-2 border-neutral-200 overflow-hidden">
                  <h4 className="font-bold text-neutral-700">
                    مشخصات گیرنده :
                  </h4>
                  <form
                    id="last-step"
                    onSubmit={handleSubmit(postData)}
                    className="flex flex-col items-start gap-3"
                  >
                    <label htmlFor="name" className="flex flex-col gap-1">
                      <p>نام و نام خانوادگی</p>
                      <input
                        id="name"
                        type="text"
                        {...register("name")}
                        className="p-2 border border-neutral-300 rounded-md"
                      />
                      {errors.name ? (
                        <span className="text-sm text-red-600">
                          لطفا نام خود را وارد کنید
                        </span>
                      ) : null}
                    </label>
                    <label htmlFor="phone" className="flex flex-col gap-1">
                      <p>شماره تماس</p>
                      <input
                        id="phone"
                        type="text"
                        {...register("phone")}
                        className="p-2 border border-neutral-300 rounded-md"
                      />
                      {errors.phone ? (
                        <span className="text-sm text-red-600">
                          لطفا شماره تماس گیرنده را وارد کنید
                        </span>
                      ) : null}
                    </label>
                    <label htmlFor="province" className="flex flex-col gap-1">
                      <p>استان</p>
                      <input
                        id="province"
                        type="text"
                        {...register("province")}
                        className="p-2 border border-neutral-300 rounded-md"
                      />
                      {errors.province ? (
                        <span className="text-sm text-red-600">
                          لطفا نام استان را وارد کنید
                        </span>
                      ) : null}
                    </label>
                    <label htmlFor="city" className="flex flex-col gap-1">
                      <p>شهر</p>
                      <input
                        id="city"
                        type="text"
                        {...register("city")}
                        className="p-2 border border-neutral-300 rounded-md"
                      />
                      {errors.city ? (
                        <span className="text-sm text-red-600">
                          لطفا نام شهر را وارد کنید
                        </span>
                      ) : null}
                    </label>
                    <label htmlFor="address" className="flex flex-col gap-1">
                      <p>آدرس کامل</p>
                      <textarea
                        id="address"
                        {...register("address")}
                        className="p-2 border border-neutral-300 rounded-md"
                      />
                      {errors.address ? (
                        <span className="text-sm text-red-600">
                          لطفا آدرس کامل گیرنده را وارد کنید
                        </span>
                      ) : null}
                    </label>
                    <label htmlFor="postalCode" className="flex flex-col gap-1">
                      <p>کد پستی</p>
                      <input
                        id="postalCode"
                        type="text"
                        {...register("postalCode")}
                        className="p-2 border border-neutral-300 rounded-md"
                      />
                      {errors.postalCode ? (
                        <span className="text-sm text-red-600">
                          لطفا کد پستی گیرنده را وارد کنید
                        </span>
                      ) : null}
                    </label>
                    <label htmlFor="note" className="flex flex-col gap-1">
                      <p>یادداشت</p>
                      <textarea
                        id="note"
                        {...register("note")}
                        className="p-2 border border-neutral-300 rounded-md"
                      />
                      {errors.note ? (
                        <span className="text-sm text-red-600">
                          یادداشت باید یک رشته متنی باشد
                        </span>
                      ) : null}
                    </label>
                  </form>
                </div>
              </div>
              <aside className=" md:sticky md:top-20 w-full fixed bottom-0 right-0 bg-white h-fit md:rounded-md border-neutral-200 border-t md:border-2 p-4 flex flex-col gap-2 items-end z-40 md:z-auto">
                <h2 className="flex justify-between w-full">
                  <span className="text-neutral-600">قیمت کل :</span>
                  <span className="text-size15 font-weight300 text-neutral-700">
                    {totalPrice}
                    <PriceUnit></PriceUnit>
                  </span>
                </h2>
                <button
                  type="submit"
                  form="last-step"
                  className="bg-green-500 text-shadow cursor-pointer text-white px-2 py-1 rounded-md"
                >
                  پرداخت
                </button>
              </aside>
            </div>
          ) : (
            <h4 className="px-5 md:px-20">سبد خرید شما خالی است</h4>
          )}
        </div>
      </main>
    </>
  );
}
