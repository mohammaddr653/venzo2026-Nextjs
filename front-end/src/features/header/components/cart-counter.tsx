"use client";
import Link from "next/link";
import "../../../assets/css/account-buttons.css";
import { useUserStore } from "@/store";
import CartSvg from "@/components/icons/cart-svg";

const CartCounter = () => {
  const { user } = useUserStore();

  return (
    <>
      {user ? (
        <div>
          <Link href={"/cart"} className="m-0 p-0 text-neutral-primary">
            <CartSvg width={33} fill={"currentColor"}></CartSvg>
          </Link>
        </div>
      ) : null}
    </>
  );
};
export default CartCounter;
