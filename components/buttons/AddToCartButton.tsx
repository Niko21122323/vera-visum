"use client";

import { useTransition } from "react";
import { addItem } from "@/app/actions/cart";
import { useCartStore } from "@/store/cartStore";

export default function AddToCartButton({ variantId }: { variantId: string }) {
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
      className="w-full bg-black text-white py-3 uppercase tracking-widest text-xs font-bold disabled:opacity-50"
    >
      {isPending ? "Adding..." : "Add to Cart"}
    </button>
  );
}
