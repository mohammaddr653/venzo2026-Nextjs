"use client"
const OrderStatus = ({ order }: any) => {
  return (
    <>
      {order.status === "paid" && (
        <p className="text-green-600 font-bold text-size14">پرداخت شده</p>
      )}
      {order.status === "canceled" && (
        <p className="text-blue-600 font-bold text-size14">پرداخت نشده</p>
      )}
      {order.status === "expired" && (
        <p className="text-black font-bold text-size14">منقضی شده</p>
      )}
      {order.status === "check" && (
        <p className="text-red-600 font-bold text-size14">در انتظار تایید</p>
      )}
      {order.status === "pending" && (
        <p className="text-yellow-500 font-bold text-size14">در حال پرداخت</p>
      )}
    </>
  );
};

export default OrderStatus;
