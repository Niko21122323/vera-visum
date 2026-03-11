import { Suspense } from "react";
import { shopifyFetch } from "@/lib/shopify";
import {
  ALL_PRODUCTS_QUERY,
  GET_COLLECTION_PRODUCTS_QUERY,
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

  // 1. Grab the page from the URL (default to 1)
  const currentPage = parseInt((params.page as string) || "1", 10);
  const perPage = 6;

  // 2. Fetch all products up to the requested page (e.g., Page 3 fetches 18 products)
  const fetchLimit = currentPage * perPage;

  let allFetchedProducts = [];
  let hasNextPage = false;

  if (currentFilter === "all") {
    const data = await shopifyFetch<any>({
      query: ALL_PRODUCTS_QUERY,
      variables: { first: fetchLimit },
    });
    allFetchedProducts = data?.products?.nodes || [];
    hasNextPage = data?.products?.pageInfo?.hasNextPage || false;
  } else {
    const data = await shopifyFetch<any>({
      query: GET_COLLECTION_PRODUCTS_QUERY,
      variables: { handle: currentFilter, first: fetchLimit },
    });
    allFetchedProducts = data?.collection?.products?.nodes || [];
    hasNextPage = data?.collection?.products?.pageInfo?.hasNextPage || false;
  }

  // 3. Slice the array so we ONLY pass the 6 products for the current page
  const startIndex = (currentPage - 1) * perPage;
  const productsToShow = allFetchedProducts.slice(startIndex, fetchLimit);

  return (
    <>
      <Suspense
        fallback={
          <div className="h-10 animate-pulse bg-foreground/10 rounded-full w-full max-w-md"></div>
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
