import { Suspense } from "react";
import { shopifyFetch } from "@/lib/shopify";
import {
  ALL_PRODUCTS_QUERY,
  GET_COLLECTION_PRODUCTS_QUERY,
} from "@/lib/graphql/queries";
import InfiniteProductGrid from "@/components/InfiniteProductGrid";
import FilterButtons from "@/components/products/FilterButtons";
import ProductsSkeleton from "@/components/skeletons/ProductsSkeleton";

async function ProductsContent({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const params = await searchParams;
  const currentFilter = (params.collection as string) || "all";

  let initialProducts = [];
  let initialPageInfo = { hasNextPage: false, endCursor: "" };

  if (currentFilter === "all") {
    const data = await shopifyFetch<any>({
      query: ALL_PRODUCTS_QUERY,
      variables: { first: 8 },
    });
    initialProducts = data?.products?.nodes || [];
    initialPageInfo = data?.products?.pageInfo || initialPageInfo;
  } else {
    const data = await shopifyFetch<any>({
      query: GET_COLLECTION_PRODUCTS_QUERY,
      variables: { handle: currentFilter, first: 8 },
    });
    initialProducts = data?.collection?.products?.nodes || [];
    initialPageInfo = data?.collection?.products?.pageInfo || initialPageInfo;
  }

  return (
    <>
      <Suspense
        fallback={
          <div className="h-10 animate-pulse bg-foreground/10 rounded-full w-full max-w-md"></div>
        }
      >
        <FilterButtons currentFilter={currentFilter} />
      </Suspense>

      <Suspense key={currentFilter} fallback={<ProductsSkeleton />}>
        <InfiniteProductGrid
          initialProducts={initialProducts}
          initialPageInfo={initialPageInfo}
          currentFilter={currentFilter}
        />
      </Suspense>
    </>
  );
}

export default function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-6">
        <div className="flex flex-col gap-y-10">
          <div>
            <h1 className="text-foreground text-4xl sm:text-5xl font-medium">
              Explore Our Eyewear Collection
            </h1>
          </div>

          <Suspense
            fallback={
              <div className="flex flex-col gap-y-10">
                <div className="h-10 animate-pulse bg-foreground/10 rounded-full w-full max-w-md"></div>
                <ProductsSkeleton />
              </div>
            }
          >
            <ProductsContent searchParams={searchParams} />
          </Suspense>
        </div>
      </div>
    </section>
  );
}
