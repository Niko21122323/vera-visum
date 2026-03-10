"use client";

import { useTransition } from "react";
import { addItem } from "@/app/actions/cart";
import { useCartStore } from "@/store/cartStore";

import { IoBagOutline } from "react-icons/io5";

const CartIconButton = ({ variantId }: { variantId: string }) => {
  const [isPending, startTransition] = useTransition();
  const { openCart, setCart } = useCartStore();

  const handleAdd = () => {
    startTransition(async () => {
      const updatedCart = await addItem(variantId);

      setCart(updatedCart);
      openCart();
    });
  };

  return (
    <button
      type="button"
      onClick={handleAdd}
      disabled={isPending}
      className="flex items-center justify-center rounded-full bg-background size-10 cursor-pointer"
    >
      <IoBagOutline className="text-lg text-foreground/50" />
    </button>
  );
};

export default CartIconButton;
