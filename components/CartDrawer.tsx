"use client";

import { useOptimistic, useTransition } from "react";
import { useCartStore } from "@/store/cartStore";
import { updateItemQuantity, removeItem } from "@/app/actions/cart";
import {
  IoCloseOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoTrashOutline,
} from "react-icons/io5";
import Image from "next/image";

export default function CartDrawer() {
  const { isOpen, closeCart, cart, setCart } = useCartStore();
  const [isPending, startTransition] = useTransition();

  // 1. Optimistic State: This reflects changes instantly while the server processes
  const [optimisticCart, setOptimisticCart] = useOptimistic(
    cart,
    (
      state,
      {
        action,
        lineId,
        quantity,
      }: { action: "update" | "delete"; lineId: string; quantity?: number },
    ) => {
      if (!state) return state;

      if (action === "delete") {
        return {
          ...state,
          lines: {
            nodes: state.lines.nodes.filter((node: any) => node.id !== lineId),
          },
        };
      }

      if (action === "update" && quantity !== undefined) {
        return {
          ...state,
          lines: {
            nodes: state.lines.nodes.map((node: any) =>
              node.id === lineId ? { ...node, quantity } : node,
            ),
          },
        };
      }
      return state;
    },
  );

  if (!isOpen) return null;

  const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    startTransition(async () => {
      // Show change instantly
      setOptimisticCart({ action: "update", lineId, quantity: newQuantity });
      // Execute Server Action
      const updatedCart = await updateItemQuantity(lineId, newQuantity);
      // Sync real state
      setCart(updatedCart);
    });
  };

  const handleRemove = async (lineId: string) => {
    startTransition(async () => {
      setOptimisticCart({ action: "delete", lineId });
      const updatedCart = await removeItem(lineId);
      setCart(updatedCart);
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/50 backdrop-blur-sm">
      <div className="w-full max-w-md bg-background h-full shadow-xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-2xl font-heading">Your Cart</h2>
          <button onClick={closeCart} className="text-3xl">
            <IoCloseOutline />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {!optimisticCart?.lines?.nodes.length ? (
            <p className="text-center text-muted-foreground mt-10">
              Your cart is empty.
            </p>
          ) : (
            optimisticCart.lines.nodes.map((item: any) => (
              <div key={item.id} className="flex gap-4 border-b pb-4">
                <div className="relative h-24 w-24 overflow-hidden rounded-md bg-secondary">
                  <Image
                    src={item.merchandise.image?.url || "/placeholder.png"}
                    alt={item.merchandise.product.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-medium">
                      {item.merchandise.product.title}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.merchandise.title}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center border rounded-full px-2">
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="p-1"
                      >
                        <IoRemoveOutline />
                      </button>
                      <span className="px-4 text-sm">{item.quantity}</span>
                      <button
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="p-1"
                      >
                        <IoAddOutline />
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemove(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <IoTrashOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {optimisticCart?.lines?.nodes.length > 0 && (
          <div className="p-6 border-t bg-secondary/20">
            <div className="flex justify-between mb-4">
              <span className="font-heading">Total</span>
              <span className="font-bold">
                {optimisticCart.cost.totalAmount.amount}{" "}
                {optimisticCart.cost.totalAmount.currencyCode}
              </span>
            </div>
            <a
              href={optimisticCart.checkoutUrl}
              className="block w-full bg-foreground text-background text-center py-4 rounded-full font-bold hover:opacity-90 transition-opacity"
            >
              Checkout
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
