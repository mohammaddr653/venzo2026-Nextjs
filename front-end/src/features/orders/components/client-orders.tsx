"use client";
import { useEffect, useState } from "react";
import { SERVER_API } from "../../../../config";
import callManager from "../../../hooks/callManager";
import axios from "axios";
import OrderStatus from "./order-status";
import ExpandedOrder from "./expanded-order";

const ClientOrders = () => {
  const [orders, setOrders] = useState<any>([]);
  const [selectedOrder, setSelectedOrder] = useState<any>(null);
  const { call } = callManager();

  async function loadOrders() {
    const response = await call(axios.get(SERVER_API + "/orders"), false);
    setOrders([...response.data.data]);
  }

  useEffect(() => {
    loadOrders();
  }, []);

  const handleSubmit = async (e: any, orderId: any) => {
    const response = await call(
      axios.post(SERVER_API + `/pay/${orderId}`),
      true
    );
    if (response.data.data)
      window.location.href = `https://sandbox.zarinpal.com/pg/StartPay/${response.data.data}`; //انتقال به صفحه پرداخت
  };

  return (
    <>
      <div className="client-orders-container flex flex-col gap-5 border border-neutral-300 rounded-md overflow-x-scroll">
        <table className="w-full text-right">
          <thead>
            <tr>
              <th className="p-2">شناسه</th>
              <th className="p-2">قیمت کل</th>
              <th className="p-2">وضعیت</th>
              <th className="p-2">عملیات</th>
            </tr>
          </thead>
          <tbody>
            {orders?.map((order: any, index: any) => {
              return (
                <tr key={index} className="odd:bg-gray-100 text-size14">
                  <td className="p-2">{order._id}</td>
                  <td className="p-2">{order.totalPrice} تومان</td>
                  <td className="p-2">
                    <OrderStatus order={order}></OrderStatus>
                  </td>
                  <td className="p-2">
                    <button
                      onClick={() => setSelectedOrder(order)}
                      className="p-2 py-1 rounded-md cursor-pointer bg-neutral-400 text-white text-shadow border"
                    >
                      جزئیات سفارش
                    </button>
                    {["canceled", "pending"].includes(order.status) && (
                      <button
                        onClick={(e) => handleSubmit(e, order._id)}
                        className="p-2 py-1 rounded-md cursor-pointer bg-green-600 text-white text-shadow border"
                      >
                        پرداخت
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {selectedOrder && (
        <ExpandedOrder
          selectedOrder={selectedOrder}
          setSelectedOrder={setSelectedOrder}
        ></ExpandedOrder>
      )}
    </>
  );
};

export default ClientOrders;
