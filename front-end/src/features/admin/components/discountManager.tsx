import { useState } from "react";
import { discountObj } from "../types/discountObj";

interface DiscountManagerProps {
  discount: discountObj;
  setDiscount: React.Dispatch<React.SetStateAction<discountObj | null>>;
}

const DiscountManager = ({ discount, setDiscount }: DiscountManagerProps) => {
  const [discountObj, setDiscountObj] = useState<discountObj>({
    offer: "",
    startedAt: "",
    expiredAt: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setDiscountObj({ ...discountObj, [e.target.name]: e.target.value });
  };

  const handleSaveDiscount = async (e: React.FormEvent) => {
    e.preventDefault();
    setDiscount({ ...discountObj });
    setDiscountObj({
      offer: "",
      startedAt: "",
      expiredAt: "",
    });
  };

  function clearDiscount() {
    setDiscount(null);
  }

  return (
    <div>
      <div className="flex flex-col gap-1 w-fit p-2">
        <input
          type="text"
          placeholder="قیمت در تخفیف"
          name="offer"
          value={discountObj.offer}
          className="border rounded p-1"
          onChange={handleChange}
          autoComplete="off"
        />
        <button
          onClick={handleSaveDiscount}
          disabled={discountObj.offer ? false : true}
          className=" bg-blue-500 rounded-md p-1"
        >
          اعمال تخفیف
        </button>
        {discount ? (
          <div className=" bg-neutral-100 border border-neutral-300 p-2 rounded-md flex flex-col">
            <span>{`قیمت در تخفیف : ${discount.offer}`}</span>
            <span>{`تاریخ شروع : ${discount.startedAt ?? ""}`}</span>
            <span>{`تاریخ پایان : ${discount.expiredAt ?? ""}`}</span>
            <button
              className="bg-red-400 rounded-md p-1 text-sm"
              onClick={clearDiscount}
            >
              حذف تخفیف
            </button>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default DiscountManager;
