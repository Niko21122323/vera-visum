import { cacheTag, cacheLife } from "next/cache";
import { shopifyFetch } from "@/lib/shopify";

import { GET_BEST_SELLING_PRODUCTS_QUERY } from "@/lib/graphql/queries";

import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/buttons/AddToCartButton";
import PrimaryButton from "@/components/buttons/PrimaryButton";

const MostSold = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag("best-sellers");

  const data = await shopifyFetch<any>({
    query: GET_BEST_SELLING_PRODUCTS_QUERY,
    variables: { first: 3 },
  });

  const products = data?.products?.nodes || [];

  return (
    <section className="py-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between pb-10 sm:pb-14 gap-y-6">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl leading-tight max-w-[450px] lg:max-w-[670px]">
            Our Most Coveted Designs, Chosen by You
          </h2>
          <div className="w-fit max-sm:hidden">
            <PrimaryButton title="View All" link="/" theme="dark" />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 sm:gap-y-12 gap-x-4 max-sm:pb-10">
          {products.map((product: any) => {
            const variantId = product.variants.nodes[0]?.id;
            const price = product.priceRange.minVariantPrice;
            const collectionTitle = product.collections?.nodes[0]?.title;

            return (
              <div key={product.id} className="flex flex-col">
                <Link
                  href={`/products/${product.handle}`}
                  className="relative flex aspect-square rounded-3xl overflow-hidden group"
                >
                  <Image
                    src={product.images.nodes[0]?.url || "/placeholder.png"}
                    alt={`${product.title} image`}
                    width={510}
                    height={510}
                    className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                  />
                </Link>
                <div className="pt-6 px-2">
                  {collectionTitle && (
                    <p className="text-[12px] text-foreground/60">
                      {collectionTitle}
                    </p>
                  )}
                  <div className="flex items-center justify-between gap-6 pt-2">
                    <p
                      className="text-foreground text-base font-light"
                      title={product.title}
                    >
                      {product.title.length > 19
                        ? `${product.title.substring(0, 19)}...`
                        : product.title}
                    </p>
                    <p className="font-light text-foreground text-sm">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: price.currencyCode,
                        maximumFractionDigits: 0,
                      }).format(price.amount)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="sm:hidden">
          <PrimaryButton title="View All" link="/" theme="dark" />
        </div>
      </div>
    </section>
  );
};

export default MostSold;
