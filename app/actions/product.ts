"use server";

import { shopifyFetch } from "@/lib/shopify";
import {
  ALL_PRODUCTS_QUERY,
  GET_COLLECTION_PRODUCTS_QUERY,
} from "@/lib/graphql/queries";

export async function fetchMoreProducts(currentFilter: string, cursor: string) {
  if (currentFilter === "all") {
    const data = await shopifyFetch<any>({
      query: ALL_PRODUCTS_QUERY,
      variables: { first: 6, after: cursor },
    });
    return {
      products: data?.products?.nodes || [],
      pageInfo: data?.products?.pageInfo,
    };
  } else {
    const data = await shopifyFetch<any>({
      query: GET_COLLECTION_PRODUCTS_QUERY,
      variables: { handle: currentFilter, first: 6, after: cursor },
    });
    return {
      products: data?.collection?.products?.nodes || [],
      pageInfo: data?.collection?.products?.pageInfo,
    };
  }
}
