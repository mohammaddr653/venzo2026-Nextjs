"use client"
import Link from "next/link";
import "../../../assets/css/account-buttons.css";
import { useUserStore } from "@/store";

const CartCounter = (props: any) => {
  const { user } = useUserStore();

  return (
    <>
      {user ? (
        <div>
          <Link href={"/cart"} className="m-0 p-0">
            <img
              src="/icons/icons8-cart-48.png"
              alt="exit-icon"
              width={props.width}
            />
          </Link>
        </div>
      ) : null}
    </>
  );
};
export default CartCounter;
