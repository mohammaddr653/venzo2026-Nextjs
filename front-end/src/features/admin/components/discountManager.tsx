import { useState } from "react";
import { discountObj } from "../types/discountObj";

interface DiscountManagerProps {
  discount: discountObj;
  setDiscount: React.Dispatch<React.SetStateAction<discountObj>>;
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

  return (
    <div>
      <h1>مدیریت تخفیف ها</h1>
      <div className="flex-column bg-green-500">
        <input
          type="text"
          placeholder="قیمت در تخفیف"
          name="offer"
          value={discountObj.offer}
          className="border"
          onChange={handleChange}
          autoComplete="off"
        />
        <br />
        <button
          onClick={handleSaveDiscount}
          disabled={discountObj.offer ? false : true}
          className="border"
        >
          اعمال تخفیف
        </button>
        {discount ? (
          <div className="bg-violet-500 flex flex-col">
            <span>{`قیمت در تخفیف : ${discount.offer}`}</span>
            <span>{`تاریخ شروع : ${discount.startedAt ?? ""}`}</span>
            <span>{`تاریخ پایان : ${discount.expiredAt ?? ""}`}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
};
export default DiscountManager;
