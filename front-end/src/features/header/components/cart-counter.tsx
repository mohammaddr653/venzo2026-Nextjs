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
        <Link
          href={"/cart"}
          className="flex h-full border rounded-full m-0 p-1.5 justify-center items-center text-neutral-primary border-primary/70 hover:bg-primary transition-all duration-300 hover:text-white"
        >
          <CartSvg className="h-full" fill={"currentColor"}></CartSvg>
        </Link>
      ) : null}
    </>
  );
};
export default CartCounter;
