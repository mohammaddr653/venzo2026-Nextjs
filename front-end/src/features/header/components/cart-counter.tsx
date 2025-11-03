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
          <Link href={"/cart"} className="flex border rounded-full m-0 p-1.5 justify-center items-center text-neutral-primary border-primary/70 hover:bg-primary transition-all duration-300 hover:text-white">
            <CartSvg width={25} fill={"currentColor"}></CartSvg>
          </Link>
        </div>
      ) : null}
    </>
  );
};
export default CartCounter;
