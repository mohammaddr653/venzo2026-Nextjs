"use client";

import ExpandedOrder from "@/features/orders/components/expanded-order";
import OrderStatus from "@/features/orders/components/order-status";
import { SERVER_API } from "../../../../../config";
import axios from "axios";
import { useEffect, useState } from "react";
import callManager from "@/hooks/callManager";
import TitleRight from "@/components/title-right";

const baseURL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://aminderakhshande.ir";

export default function OrdersPage() {
  const [orders, setOrders] = useState<any>([]);
  const { call } = callManager();
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  async function loadOrders() {
    const response = await call(
      axios.get(SERVER_API + "/admin/dashboard/orders"),
      false
    );
    setOrders([...response.data.data]);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const handleVerify = async (e: any, authority: any) => {
    //تایید تراکنش بصورت دستی
    const response = await call(
      axios.get(SERVER_API + `/pay/verify?Authority=${authority}`),
      true
    );
    loadOrders();
  };

  const handleInquiry = async (e: any, authority: any) => {
    //استعلام تراکنش
    const response = await call(
      axios.get(SERVER_API + `/pay/inquiry?Authority=${authority}`),
      true
    );
  };

  return (
    <>
      <div className="client-orders-page-container flex flex-col gap-5">
        <TitleRight
          title="مدیریت سفارش ها"
          className={"text-wrap"}
        ></TitleRight>
        <div className="bg-neutral-100 flex flex-col gap-5 p-2 grow">
          <div className="flex justify-between items-center">
            <p>لیست سفارشات</p>
          </div>
          <table className="cu-records-table w-full text-sm">
            <thead>
              <tr>
                <th>شناسه</th>
                <th>قیمت کل</th>
                <th>وضعیت</th>
                <th>عملیات</th>
              </tr>
            </thead>
            <tbody>
              {orders?.map((order: any, index: any) => {
                return (
                  <tr key={index}>
                    <td>{order._id}</td>
                    <td>{order.totalPrice} تومان</td>
                    <td>
                      <OrderStatus order={order}></OrderStatus>
                      {order.authority !== "" && (
                        <p>شناسه پرداخت : {order.authority}</p>
                      )}
                      {order.referenceId !== "" && (
                        <p>کد رهگیری : {order.referenceId}</p>
                      )}
                    </td>
                    <td>
                      <div className="flex flex-row gap-2">
                        {order.authority !== "" && (
                          <>
                            <button
                              onClick={() => setSelectedOrder(order)}
                              className="p-2 py-1 rounded-md cursor-pointer bg-neutral-400 text-white text-shadow border"
                            >
                              جزئیات سفارش
                            </button>
                            <button
                              className="p-2 bg-green-500 border rounded-md"
                              onClick={(e) => handleVerify(e, order.authority)}
                            >
                              اعتبار سنجی
                            </button>
                            <button
                              className="p-2 bg-red-500 border rounded-md"
                              onClick={(e) => handleInquiry(e, order.authority)}
                            >
                              استعلام
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      {selectedOrder && (
        <ExpandedOrder
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        ></ExpandedOrder>
      )}
    </>
  );
}
