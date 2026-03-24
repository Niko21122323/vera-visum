"use client";

import { useOptimistic, useTransition } from "react";
import { useCartStore } from "@/store/cartStore";
import { updateItemQuantity, removeItem } from "@/app/actions/cart";
import Image from "next/image";
import {
  IoCloseOutline,
  IoAddOutline,
  IoRemoveOutline,
  IoTrashOutline,
} from "react-icons/io5";
import Link from "next/link";

const CartComponent = () => {
  const { isOpen, closeCart, cart, setCart } = useCartStore();
  const [isPending, startTransition] = useTransition();
  const [optimisticCart, setOptimisticCart] = useOptimistic(
    cart,
    (
      state,
      {
        action,
        lineId,
        quantity,
      }: { action: "update" | "delete"; lineId: string; quantity?: number }
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
              node.id === lineId ? { ...node, quantity } : node
            ),
          },
        };
      }

      return state;
    }
  );

  const handleUpdateQuantity = async (lineId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    startTransition(async () => {
      setOptimisticCart({ action: "update", lineId, quantity: newQuantity });

      const updateCart = await updateItemQuantity(lineId, newQuantity);

      setCart(updateCart);
    });
  };

  const handleRemove = async (lineId: string) => {
    startTransition(async () => {
      setOptimisticCart({ action: "delete", lineId });

      const updateCart = await removeItem(lineId);

      setCart(updateCart);
    });
  };

  if (!isOpen) return null;

  const formatPrice = (amount: string) => {
    return new Intl.NumberFormat("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(parseFloat(amount));
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-foreground/50 backdrop-blur-sm">
      <div className="flex flex-col w-full max-w-md bg-background h-full">
        <div className="flex items-center justify-between p-6 border-b border-foreground/10">
          <h3 className="text-foreground text-2xl !font-body">Your Cart</h3>
          <button
            type="button"
            onClick={closeCart}
            className="text-foreground text-2xl cursor-pointer"
            title="Colse Cart"
          >
            <IoCloseOutline />
          </button>
        </div>

        <div className="overflow-y-auto p-6 space-y-6 h-full">
          {!optimisticCart?.lines?.nodes.length ? (
            <p className="text-center text-foreground/60">Your Cart is Empty</p>
          ) : (
            optimisticCart.lines.nodes.map((item: any) => (
              <div key={item.id} className="grid grid-cols-12 gap-4">
                <div className="relative aspect-square overflow-hidden col-span-3">
                  <Image
                    src={item.merchandise.image?.url || "/placeholder.png"}
                    alt={item.merchandise.product.title}
                    width={100}
                    height={100}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col items-start justify-between col-span-9">
                  <div className="flex items-center justify-between w-full pt-1">
                    <p
                      className="text-foreground text-sm font-light cursor-default"
                      title={item.merchandise.product.title}
                    >
                      {item.merchandise.product.title.length > 15
                        ? `${item.merchandise.product.title.substring(
                            0,
                            15
                          )}...`
                        : item.merchandise.product.title}
                    </p>
                    <p
                      className="text-foreground text-[12px] font-light cursor-default"
                      title="Product Price"
                    >
                      {formatPrice(item.merchandise.price.amount)}
                    </p>
                  </div>
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity - 1)
                        }
                        className="flex items-center justify-center text-sm text-foreground size-7 bg-foreground/5 cursor-pointer"
                        title="Remove"
                      >
                        <IoRemoveOutline />
                      </button>
                      <span
                        className="flex items-center justify-center size-7 text-sm text-foreground cursor-default"
                        title="Product Quantity"
                      >
                        {item.quantity}
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          handleUpdateQuantity(item.id, item.quantity + 1)
                        }
                        className="flex items-center justify-center text-sm text-foreground size-7 bg-foreground/5 cursor-pointer"
                        title="Add More"
                      >
                        <IoAddOutline />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      className="flex items-center justify-center size-7 bg-foreground/5 text-foreground text-sm cursor-pointer"
                      title="Remove from Cart"
                    >
                      <IoTrashOutline />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {optimisticCart?.lines?.nodes.length > 0 && (
          <div className="p-6 border-t border-foreground/10">
            <div className="flex flex-col gap-6">
              <div className="flex items-center justify-between gap-4">
                <p className="text-[12px] text-foreground/60 font-light">
                  Shipping
                </p>
                <p className="text-[12px] text-foreground/60 font-light">
                  At Checkout
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-foreground text-base font-medium">
                    Subtotal
                  </p>
                  <p className="text-foreground text-base font-medium">
                    <span className="text-foreground/60 text-[12px] mr-1">
                      {optimisticCart.cost.totalAmount.currencyCode}
                    </span>
                    {formatPrice(optimisticCart.cost.totalAmount.amount)}
                  </p>
                </div>
                <Link
                  href={optimisticCart.checkoutUrl}
                  className="flex items-center justify-center text-background text-center bg-foreground px-4 py-3.5"
                >
                  Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartComponent;
