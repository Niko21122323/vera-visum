"use client";

import { useEffect, useRef } from "react";
import { useCartStore } from "@/store/cartStore";

export default function CartInitializer({ cart }: { cart: any }) {
  const hasInitialized = useRef(false);

  useEffect(() => {
    if (!hasInitialized.current && cart) {
      useCartStore.setState({ cart });
      hasInitialized.current = true;
    }
  }, [cart]);

  return null;
}
