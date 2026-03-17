"use client";

import { useCartStore } from "@/store/cartStore";
import { IoBagOutline } from "react-icons/io5";

const CartButton = ({ theme }: { theme: string }) => {
  const openCart = useCartStore((state) => state.openCart);
  const totalQuantity = useCartStore((state) => state.totalQuantity());

  return (
    <button
      type="button"
      onClick={openCart}
      className={`flex items-center gap-3 lg:p-3 rounded-full cursor-pointer ${theme === "dark" ? "lg:bg-foreground" : "lg:bg-background"}`}
    >
      <div className="relative">
        <IoBagOutline
          className={`text-2xl lg:text-base ${theme === "dark" ? "text-foreground lg:text-background" : "text-background lg:text-foreground"}`}
        />
        {totalQuantity !== 0 && (
          <div className="absolute flex items-center justify-center -top-5 -right-5 size-6 rounded-full bg-red-900">
            <span className="text-[10px] text-background">{totalQuantity}</span>
          </div>
        )}
      </div>
    </button>
  );
};

export default CartButton;
