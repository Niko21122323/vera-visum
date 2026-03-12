import Link from "next/link";
import ProductCard from "@/components/ProductCard";

export default function PaginatedProductGrid({
  products,
  currentPage,
  hasNextPage,
  totalPages,
  currentFilter,
}: {
  products: unknown[];
  currentPage: number;
  hasNextPage: boolean;
  totalPages?: number;
  currentFilter: string;
}) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-foreground/60 text-lg">No products found.</p>
      </div>
    );
  }

  const createPageUrl = (pageNumber: number) => {
    const params = new URLSearchParams();
    if (currentFilter !== "all") params.set("collection", currentFilter);
    if (pageNumber > 1) params.set("page", pageNumber.toString());
    return `?${params.toString()}`;
  };

  const generatePagination = () => {
    if (!totalPages) {
      const pages: (number | string)[] = [];
      if (currentPage > 2) pages.push(1, "...");
      else if (currentPage === 2) pages.push(1);

      pages.push(currentPage);

      if (hasNextPage) {
        pages.push(currentPage + 1);
        pages.push("...");
      }
      return pages;
    }

    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage <= 3) {
      return [1, 2, 3, 4, "...", totalPages];
    }

    if (currentPage >= totalPages - 2) {
      return [
        1,
        "...",
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }

    return [
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages,
    ];
  };

  const paginationItems = generatePagination();

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
      <div className="mt-16 flex items-center justify-center gap-2 pb-10">
        {currentPage > 1 ? (
          <Link
            href={createPageUrl(currentPage - 1)}
            className="px-5 py-2 mr-2 text-sm font-medium border border-foreground/20 rounded-full hover:bg-foreground/5 transition-colors"
          >
            Previous
          </Link>
        ) : (
          <button
            disabled
            className="px-5 py-2 mr-2 text-sm font-medium border border-foreground/20 rounded-full opacity-30 cursor-not-allowed"
          >
            Previous
          </button>
        )}
        <div className="flex items-center gap-1 mx-2">
          {paginationItems.map((page, index) => {
            if (page === "...") {
              return (
                <span
                  key={`ellipsis-${index}`}
                  className="w-10 flex items-center justify-center text-foreground/50"
                >
                  ...
                </span>
              );
            }

            return (
              <Link
                key={`page-${page}`}
                href={createPageUrl(page as number)}
                className={`w-10 h-10 flex items-center justify-center rounded-full text-sm transition-colors ${
                  currentPage === page
                    ? "bg-foreground text-background font-medium"
                    : "hover:bg-foreground/5 text-foreground/70"
                }`}
              >
                {page}
              </Link>
            );
          })}
        </div>

        {hasNextPage ? (
          <Link
            href={createPageUrl(currentPage + 1)}
            className="px-5 py-2 ml-2 text-sm font-medium border border-foreground/20 rounded-full hover:bg-foreground/5 transition-colors"
          >
            Next
          </Link>
        ) : (
          <button
            disabled
            className="px-5 py-2 ml-2 text-sm font-medium border border-foreground/20 rounded-full opacity-30 cursor-not-allowed"
          >
            Next
          </button>
        )}
      </div>
    </div>
  );
}
