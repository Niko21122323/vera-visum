"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { fetchMoreProducts } from "@/app/actions/product";

const formatPrice = (amount: string) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(parseFloat(amount));
};

const BLUR_IMAGE =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=";

export default function InfiniteProductGrid({
  initialProducts,
  initialPageInfo,
  currentFilter,
}: {
  initialProducts: any[];
  initialPageInfo: { hasNextPage: boolean; endCursor: string };
  currentFilter: string;
}) {
  const [products, setProducts] = useState(initialProducts);
  const [pageInfo, setPageInfo] = useState(initialPageInfo);
  const [loading, setLoading] = useState(false);
  const observerTarget = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !pageInfo.hasNextPage) return;

    setLoading(true);
    try {
      const { products: newProducts, pageInfo: newPageInfo } =
        await fetchMoreProducts(currentFilter, pageInfo.endCursor);

      setProducts((prev) => [...prev, ...newProducts]);
      setPageInfo(newPageInfo);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [loading, pageInfo, currentFilter]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1.0 },
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => observer.disconnect();
  }, [loadMore]);

  if (products.length === 0) {
    return (
      <div className="py-20 text-center">
        <p className="text-foreground/60 text-lg">
          No products found in this collection.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-12 gap-x-6 pt-8">
        {products.map((product: any) => (
          <div key={product.id} className="flex flex-col">
            <Link href={`/products/${product.handle}`} className="group">
              <div className="relative aspect-square rounded-3xl bg-foreground/5 mb-4 overflow-hidden">
                <Image
                  src={product.images?.nodes[0]?.url || "/placeholder.png"}
                  alt={product.title}
                  fill
                  loading="lazy"
                  placeholder="blur"
                  blurDataURL={BLUR_IMAGE}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>
              <div className="flex items-center justify-between px-1">
                <h3 className="text-base font-light truncate pr-4">
                  {product.title}
                </h3>
                <p className="text-sm font-light whitespace-nowrap">
                  {formatPrice(product.priceRange?.minVariantPrice?.amount)}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {pageInfo.hasNextPage && (
        <div ref={observerTarget} className="w-full py-12 flex justify-center">
          <div className="h-6 w-6 border-2 border-foreground/20 border-t-foreground rounded-full animate-spin"></div>
        </div>
      )}
    </>
  );
}
