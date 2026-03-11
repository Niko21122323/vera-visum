import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function PaginatedProductGrid({
  products,
  currentPage,
  hasNextPage,
  currentFilter,
}: {
  products: any[];
  currentPage: number;
  hasNextPage: boolean;
  currentFilter: string;
}) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-foreground/60 text-lg">No products found.</p>
      </div>
    );
  }

  // Helper to construct the URL with current filters intact
  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (currentFilter !== "all") params.set("collection", currentFilter);
    if (pageNumber > 1) params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  return (
    <div className="flex flex-col pt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-4">
        {products.map((product: any) => {
          const price = product.priceRange?.minVariantPrice;
          const variantId = product.variants?.nodes?.[0]?.id;
          const imageUrl =
            product.images?.nodes?.[0]?.url || "/placeholder.png";

          return (
            <ProductCard
              key={product.id}
              variantId={variantId}
              productLink={product.handle}
              title={product.title}
              image={imageUrl}
              currency={price?.currencyCode || "USD"}
              price={price?.amount || "0.00"}
            />
          );
        })}
      </div>

      <div className="mt-16 flex items-center justify-center gap-4 pb-10">
        {/* Previous Button */}
        {currentPage > 1 ? (
          <Link
            href={createPageUrl(currentPage - 1)}
            scroll={true}
            className="px-6 py-2 text-sm font-medium border border-foreground/20 rounded-full hover:bg-foreground/5 transition-colors"
          >
            Previous
          </Link>
        ) : (
          <button
            disabled
            className="px-6 py-2 text-sm font-medium border border-foreground/20 rounded-full opacity-30 cursor-not-allowed"
          >
            Previous
          </button>
        )}

        {/* Current Page Indicator */}
        <div className="w-10 h-10 flex items-center justify-center rounded-full text-sm bg-foreground text-background font-medium">
          {currentPage}
        </div>

        {/* Next Button */}
        {hasNextPage ? (
          <Link
            href={createPageUrl(currentPage + 1)}
            scroll={true}
            className="px-6 py-2 text-sm font-medium border border-foreground/20 rounded-full hover:bg-foreground/5 transition-colors"
          >
            Next
          </Link>
        ) : (
          <button
            disabled
            className="px-6 py-2 text-sm font-medium border border-foreground/20 rounded-full opacity-30 cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
