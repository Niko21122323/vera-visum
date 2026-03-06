"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import { shopifyFetch } from "@/lib/shopify";
import {
  ADD_TO_CART_MUTATION,
  CREATE_CART_MUTATION,
  GET_CART_QUERY,
  REMOVE_FROM_CART_MUTATION,
  UPDATE_CART_MUTATION,
} from "@/lib/graphql/queries";

export async function getCart() {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) return null;

  try {
    const data = await shopifyFetch<any>({
      query: GET_CART_QUERY,
      variables: { cartId },
      tags: ["cart"],
      revalidate: 0,
    });

    return data.cart;
  } catch (error) {
    console.error("Cart fetch failed:", error);
    return null;
  }
}

export async function addItem(variantId: string) {
  const cookieStore = await cookies();
  let cartId = cookieStore.get("cartId")?.value;
  let cart;

  try {
    if (!cartId) {
      const data = await shopifyFetch<any>({
        query: CREATE_CART_MUTATION,
        variables: {
          input: {
            lines: [{ merchandiseId: variantId, quantity: 1 }],
          },
        },
      });

      cart = data.cartCreate.cart;
      cookieStore.set("cartId", cart.id, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        path: "/",
      });
    } else {
      const data = await shopifyFetch<any>({
        query: ADD_TO_CART_MUTATION,
        variables: {
          cartId,
          lines: [{ merchandiseId: variantId, quantity: 1 }],
        },
      });

      cart = data.cartLinesAdd.cart;
    }

    // Next.js 16 requires the scope argument: "data" or "page"
    revalidateTag("cart", "data");
    return cart;
  } catch (error) {
    console.error("Error adding item:", error);
    throw error;
  }
}

export async function updateItemQuantity(lineId: string, quantity: number) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) return null;

  try {
    const data = await shopifyFetch<any>({
      query: UPDATE_CART_MUTATION,
      variables: { cartId, lines: [{ id: lineId, quantity }] },
    });

    revalidateTag("cart", "data");
    return data.cartLinesUpdate?.cart;
  } catch (error) {
    console.error("Error updating quantity:", error);
    throw error;
  }
}

export async function removeItem(lineId: string) {
  const cookieStore = await cookies();
  const cartId = cookieStore.get("cartId")?.value;

  if (!cartId) return null;

  try {
    const data = await shopifyFetch<any>({
      query: REMOVE_FROM_CART_MUTATION,
      variables: { cartId, lineIds: [lineId] },
    });

    revalidateTag("cart", "data");
    return data.cartLinesRemove?.cart;
  } catch (error) {
    console.error("Error removing item:", error);
    throw error;
  }
}
