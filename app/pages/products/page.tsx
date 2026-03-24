import { Suspense } from "react";
import { shopifyFetch } from "@/lib/shopify";
import {
  ALL_PRODUCTS_QUERY,
  GET_NEWEST_PRODUCTS_QUERY,
  GET_BEST_SELLING_PRODUCTS_QUERY,
  GET_SALE_PRODUCTS_QUERY,
  GET_COLLECTION_PRODUCTS_QUERY,
} from "@/lib/graphql/queries";
import FilterButtons from "@/components/products/FilterButtons";
import PaginatedProductGrid from "@/components/InfiniteProductGrid";
import Image from "next/image";
import bannerImage from "../../../public/assets/photos/products/banner-image.jpg";

async function ProductsContent({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const collectionParam = (params.collection as string) || "all";
  const currentFilters = collectionParam.split(",").filter(Boolean);
  const currentPage = parseInt((params.page as string) || "1", 10);
  const perPage = 6;
  const fetchLimit = currentPage * perPage;

  let products: any[] = [];
  let hasNextPage = false;
  let data: any;

  const isAll = currentFilters.includes("all") || currentFilters.length === 0;

  if (isAll) {
    data = await shopifyFetch<any>({
      query: ALL_PRODUCTS_QUERY,
      variables: { first: fetchLimit },
    });
    products = data?.products?.nodes || [];
    hasNextPage = data?.products?.pageInfo?.hasNextPage || false;
  } else if (currentFilters.length === 1) {
    const filter = currentFilters[0];
    if (filter === "new") {
      data = await shopifyFetch<any>({
        query: GET_NEWEST_PRODUCTS_QUERY,
        variables: { first: fetchLimit },
      });
      products = data?.products?.nodes || [];
      hasNextPage = data?.products?.pageInfo?.hasNextPage || false;
    } else if (filter === "most-sold") {
      data = await shopifyFetch<any>({
        query: GET_BEST_SELLING_PRODUCTS_QUERY,
        variables: { first: fetchLimit },
      });
      products = data?.products?.nodes || [];
      hasNextPage = data?.products?.pageInfo?.hasNextPage || false;
    } else if (filter === "discount") {
      data = await shopifyFetch<any>({
        query: GET_SALE_PRODUCTS_QUERY,
        variables: { first: 250 },
      });
      products = data?.products?.nodes || [];
      hasNextPage = products.length > fetchLimit;
    } else {
      data = await shopifyFetch<any>({
        query: GET_COLLECTION_PRODUCTS_QUERY,
        variables: { handle: filter, first: fetchLimit },
      });
      products = data?.collection?.products?.nodes || [];
      hasNextPage = data?.collection?.products?.pageInfo?.hasNextPage || false;
    }
  } else {
    const attributeFilters = ["new", "most-sold", "discount"];
    const activeCollectionHandles = currentFilters.filter(
      (f) => !attributeFilters.includes(f),
    );
    const hasDiscount = currentFilters.includes("discount");
    const hasNew = currentFilters.includes("new");
    const hasMostSold = currentFilters.includes("most-sold");

    let pool: any[] = [];

    if (activeCollectionHandles.length > 0) {
      const results = await Promise.all(
        activeCollectionHandles.map((handle) =>
          shopifyFetch<any>({
            query: GET_COLLECTION_PRODUCTS_QUERY,
            variables: { handle, first: 100 },
          }),
        ),
      );

      const uniqueMap = new Map();
      results.forEach((res) => {
        res?.collection?.products?.nodes?.forEach((p: any) => {
          if (p?.id) uniqueMap.set(p.id, p);
        });
      });
      pool = Array.from(uniqueMap.values());
    } else {
      const baseQuery = hasMostSold
        ? GET_BEST_SELLING_PRODUCTS_QUERY
        : ALL_PRODUCTS_QUERY;
      data = await shopifyFetch<any>({
        query: baseQuery,
        variables: { first: 250 },
      });
      pool = data?.products?.nodes || [];
    }

    products = pool.filter((product) => {
      let match = true;
      if (hasDiscount) {
        const v = product.variants?.nodes?.[0];
        match =
          match &&
          parseFloat(v?.compareAtPrice?.amount || "0") >
            parseFloat(v?.price?.amount || "0");
      }
      if (hasNew) {
        const created = new Date(product.createdAt).getTime();
        const thirtyDaysAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
        match = match && created > thirtyDaysAgo;
      }
      return match;
    });

    hasNextPage = products.length > fetchLimit;
  }

  const startIndex = (currentPage - 1) * perPage;
  const productsToShow = products.slice(startIndex, startIndex + perPage);

  return (
    <div className="space-y-12">
      <FilterButtons />
      {productsToShow.length > 0 ? (
        <PaginatedProductGrid
          products={productsToShow}
          currentPage={currentPage}
          hasNextPage={hasNextPage}
          currentFilter={collectionParam}
        />
      ) : (
        <div className="py-20 text-center text-xl text-foreground/50">
          No products found for this combination.
        </div>
      )}
    </div>
  );
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <main className="min-h-screen">
      <section className="relative overflow-hidden">
        <Image
          src={bannerImage}
          alt="banner image"
          className="w-full h-auto object-cover"
        />
      </section>
      <div className="container mx-auto px-6 py-24">
        <Suspense
          fallback={
            <div className="animate-pulse py-20 text-center text-foreground/40">
              Loading designs...
            </div>
          }
        >
          <ProductsContent searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
