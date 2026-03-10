"use client";

import { useState, useRef } from "react";
import { fetchMoreProducts } from "@/app/actions/product";
import ProductCard from "@/components/ProductCard";

export default function PaginatedProductGrid({
  initialProducts,
  initialPageInfo,
  currentFilter,
}: {
  initialProducts: any[];
  initialPageInfo: { hasNextPage: boolean; endCursor: string };
  currentFilter: string;
}) {
  const [pagesData, setPagesData] = useState<Record<number, any[]>>({
    1: initialProducts,
  });
  const [cursors, setCursors] = useState<Record<number, string>>({
    1: initialPageInfo.endCursor,
  });
  const [hasNextPage, setHasNextPage] = useState<Record<number, boolean>>({
    1: initialPageInfo.hasNextPage,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const maxAvailablePage =
    Math.max(...Object.keys(pagesData).map(Number)) +
    (hasNextPage[currentPage] ? 1 : 0);

  const scrollToGrid = () => {
    if (gridRef.current) {
      const y =
        gridRef.current.getBoundingClientRect().top + window.scrollY - 100;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const goToPage = async (pageNumber: number) => {
    if (pagesData[pageNumber]) {
      setCurrentPage(pageNumber);
      scrollToGrid();
      return;
    }

    if (
      !loading &&
      pageNumber === currentPage + 1 &&
      hasNextPage[currentPage]
    ) {
      setLoading(true);
      try {
        const { products: newProducts, pageInfo: newPageInfo } =
          await fetchMoreProducts(currentFilter, cursors[currentPage]);

        setPagesData((prev) => ({ ...prev, [pageNumber]: newProducts }));
        setCursors((prev) => ({
          ...prev,
          [pageNumber]: newPageInfo.endCursor,
        }));
        setHasNextPage((prev) => ({
          ...prev,
          [pageNumber]: newPageInfo.hasNextPage,
        }));
        setCurrentPage(pageNumber);
        scrollToGrid();
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
  };

  const currentProducts = pagesData[currentPage] || [];
  const visiblePages = Array.from(
    { length: maxAvailablePage },
    (_, i) => i + 1,
  );

  return (
    <div ref={gridRef} className="flex flex-col pt-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-12 gap-x-4">
        {currentProducts.map((product: any) => {
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
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1 || loading}
          className="px-6 py-2 text-sm font-medium border border-foreground/20 rounded-full hover:bg-foreground/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Previous
        </button>

        <div className="flex items-center gap-1 mx-2">
          {visiblePages.map((pageNum) => (
            <button
              type="button"
              key={pageNum}
              onClick={() => goToPage(pageNum)}
              className={`w-10 h-10 flex items-center justify-center rounded-full text-sm transition-colors ${
                currentPage === pageNum
                  ? "bg-foreground text-background font-medium"
                  : "hover:bg-foreground/5 text-foreground/70"
              }`}
            >
              {loading &&
              pageNum === currentPage + 1 &&
              pageNum === maxAvailablePage ? (
                <div className="h-4 w-4 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
              ) : (
                pageNum
              )}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={!hasNextPage[currentPage] || loading}
          className="px-6 py-2 text-sm font-medium border border-foreground/20 rounded-full hover:bg-foreground/5 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
