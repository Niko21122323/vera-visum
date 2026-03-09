import { Suspense } from "react";
import Link from "next/link";
import { shopifyFetch } from "@/lib/shopify";
import {
  ALL_PRODUCTS_QUERY,
  GET_COLLECTION_PRODUCTS_QUERY,
  GET_COLLECTIONS_QUERY,
} from "@/lib/graphql/queries";
import InfiniteProductGrid from "@/components/InfiniteProductGrid";

async function FilterList({ currentFilter }: { currentFilter: string }) {
  "use cache";

  const data = await shopifyFetch<any>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first: 10 },
  });

  const collections =
    data?.collections?.nodes?.filter(
      (col: any) => col.handle !== "frontpage" && col.handle !== "home-page",
    ) || [];

  return (
    <div className="flex flex-wrap items-center gap-4">
      <Link
        href="?"
        className={`px-5 py-2.5 rounded-full border text-sm transition-colors duration-200 ${
          currentFilter === "all"
            ? "bg-foreground text-background border-foreground"
            : "bg-transparent text-foreground border-foreground/20 hover:border-foreground"
        }`}
      >
        All Products
      </Link>

      {collections.map((collection: any) => {
        const isActive = currentFilter === collection.handle;

        return (
          <Link
            key={collection.id}
            href={`?collection=${collection.handle}`}
            className={`px-5 py-2.5 rounded-full border text-sm transition-colors duration-200 ${
              isActive
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-foreground border-foreground/20 hover:border-foreground"
            }`}
          >
            {collection.title}
          </Link>
        );
      })}
    </div>
  );
}

function GridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-6 pt-8">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="flex flex-col">
          <div className="relative aspect-square rounded-3xl bg-foreground/5 mb-4 animate-pulse"></div>
          <div className="flex items-center justify-between px-1">
            <div className="h-5 bg-foreground/10 rounded w-2/3 animate-pulse"></div>
            <div className="h-5 bg-foreground/10 rounded w-1/4 animate-pulse"></div>
          </div>
        </div>
      ))}
    </div>
  );
}

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
        <FilterList currentFilter={currentFilter} />
      </Suspense>

      <Suspense key={currentFilter} fallback={<GridSkeleton />}>
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
                <GridSkeleton />
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
