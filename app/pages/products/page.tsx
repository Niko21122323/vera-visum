import { Suspense } from "react";
import { shopifyFetch } from "@/lib/shopify";
import {
  ALL_PRODUCTS_QUERY,
  GET_BEST_SELLING_PRODUCTS_QUERY,
  GET_COLLECTION_PRODUCTS_QUERY,
  GET_NEWEST_PRODUCTS_QUERY,
  GET_SALE_PRODUCTS_QUERY,
} from "@/lib/graphql/queries";
import FilterButtons from "@/components/products/FilterButtons";
import ProductsSkeleton from "@/components/skeletons/ProductsSkeleton";
import PaginatedProductGrid from "@/components/InfiniteProductGrid";
import Image from "next/image";
import bannerImage from "../../../public/assets/photos/products/banner-image.jpg";

async function ProductsContent({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const currentFilter = (params.collection as string) || "all";
  const currentPage = parseInt((params.page as string) || "1", 10);
  const perPage = 6;
  const fetchLimit = currentPage * perPage;

  let products = [];
  let hasNextPage = false;
  let data;

  if (currentFilter === "all") {
    data = await shopifyFetch<any>({
      query: ALL_PRODUCTS_QUERY,
      variables: { first: fetchLimit },
    });
    products = data?.products?.nodes || [];
    hasNextPage = data?.products?.pageInfo?.hasNextPage || false;
  } else if (currentFilter === "new") {
    data = await shopifyFetch<any>({
      query: GET_NEWEST_PRODUCTS_QUERY,
      variables: { first: fetchLimit },
    });
    products = data?.products?.nodes || [];
    hasNextPage = data?.products?.pageInfo?.hasNextPage || false;
  } else if (currentFilter === "most-sold") {
    data = await shopifyFetch<any>({
      query: GET_BEST_SELLING_PRODUCTS_QUERY,
      variables: { first: fetchLimit },
    });
    products = data?.products?.nodes || [];
    hasNextPage = data?.products?.pageInfo?.hasNextPage || false;
  } else if (currentFilter === "discount") {
    data = await shopifyFetch<any>({
      query: GET_SALE_PRODUCTS_QUERY,
      variables: { first: 250 },
    });
    const allNodes = data?.products?.nodes || [];
    const filteredDiscounted = allNodes.filter((product: any) => {
      const variant = product.variants.nodes[0];
      const price = parseFloat(variant?.price?.amount || "0");
      const compareAt = parseFloat(variant?.compareAtPrice?.amount || "0");
      return compareAt > price;
    });
    products = filteredDiscounted;
    hasNextPage = filteredDiscounted.length > fetchLimit;
  } else {
    data = await shopifyFetch<any>({
      query: GET_COLLECTION_PRODUCTS_QUERY,
      variables: { handle: currentFilter, first: fetchLimit },
    });
    products = data?.collection?.products?.nodes || [];
    hasNextPage = data?.collection?.products?.pageInfo?.hasNextPage || false;
  }

  const startIndex = (currentPage - 1) * perPage;
  const productsToShow = products.slice(startIndex, startIndex + perPage);

  return (
    <>
      <Suspense
        fallback={
          <div className="h-12 w-72 animate-pulse rounded-full bg-foreground/10" />
        }
      >
        <FilterButtons currentFilter={currentFilter} />
      </Suspense>

      <PaginatedProductGrid
        products={productsToShow}
        currentPage={currentPage}
        hasNextPage={hasNextPage}
        currentFilter={currentFilter}
      />
    </>
  );
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <main>
      <section className="relative overflow-hidden">
        <Image
          src={bannerImage}
          alt="banner image"
          className="w-full h-auto object-cover"
        />
      </section>
      <section className="py-24 sm:py-36">
        <div className="container mx-auto px-6">
          <div className="flex flex-col gap-y-10">
            <div>
              <h1 className="text-foreground text-4xl sm:text-5xl font-medium">
                Explore Our Eyewear Collection
              </h1>
            </div>

            <Suspense fallback={<ProductsSkeleton />}>
              <ProductsContent searchParams={searchParams} />
            </Suspense>
          </div>
        </div>
      </section>
    </main>
  );
}
