import OrderStatus from "./order-status";
import PriceUnit from "../../../components/priceUnit";

const ExpandedOrder = ({ selectedOrder, setSelectedOrder }: any) => {
  return (
    <div className="fixed w-screen h-screen top-0 right-0 z-60 flex justify-center items-center">
      <div
        className="bg-glass-shadow w-full h-full absolute top-0 right-0"
        onClick={() => setSelectedOrder(null)}
      ></div>
      <div className="w-[80%] h-[80%] z-10 bg-white flex flex-col justify-start overflow-y-scroll">
        <button
          onClick={() => setSelectedOrder(null)}
          className=" flex w-fit self-end p-5"
        >
          ❌
        </button>
        <div className=" flex flex-col gap-5 justify-center items-start p-5">
          <p>شناسه سفارش : {selectedOrder?._id}</p>
          <div className="flex gap-1 items-center">
            <span>وضعیت :</span>
            <OrderStatus order={selectedOrder}></OrderStatus>
          </div>
          <p>
            قیمت کل : {selectedOrder?.totalPrice}
            <PriceUnit></PriceUnit>
          </p>
          <div className="flex flex-col gap-2 border p-3 w-full rounded border-neutral-300">
            <h4 className="text-center font-bold">مشخصات گیرنده</h4>
            <p>نام : {selectedOrder?.receiver.name}</p>
            <p>شماره تماس : {selectedOrder?.receiver.phone}</p>
            <p>استان : {selectedOrder?.receiver.province}</p>
            <p>شهر : {selectedOrder?.receiver.city}</p>
            <p>آدرس کامل : {selectedOrder?.receiver.address}</p>
            <p>کد پستی : {selectedOrder?.receiver.postalCode}</p>
            <p>یادداشت مشتری : {selectedOrder?.receiver.note}</p>
          </div>
          <div className="w-full rounded border border-neutral-300 overflow-x-scroll">
            <table className="w-full text-right">
              <thead>
                <tr>
                  <th className="p-2">محصول</th>
                  <th className="p-2">جزئیات</th>
                  <th className="p-2">قیمت واحد</th>
                  <th className="p-2">تعداد</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrder?.products.map((order: any, index: any) => {
                  return (
                    <tr key={index} className="odd:bg-gray-100 text-size14">
                      <td className="p-2">{order?.name}</td>
                      <td className="p-2">{order?.selectedPropertyval}</td>
                      <td className="p-2">
                        <div className="flex items-center gap-1 font-bold">
                          {order?.discount ? (
                            <>
                              <span className="line-through text-size13 font-extralight">
                                {order?.price}
                              </span>
                              <span>
                                {order?.discount.offer}
                                <PriceUnit></PriceUnit>
                              </span>
                            </>
                          ) : (
                            <span>
                              {order?.price}
                              <PriceUnit></PriceUnit>
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-2">{order?.count}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpandedOrder;
