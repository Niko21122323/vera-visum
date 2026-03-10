import { cacheTag, cacheLife } from "next/cache";
import { shopifyFetch } from "@/lib/shopify";

import { GET_BEST_SELLING_PRODUCTS_QUERY } from "@/lib/graphql/queries";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import ProductCard from "@/components/ProductCard";

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
            const price = product.priceRange.minVariantPrice;
            const collectionTitle = product.collections?.nodes[0]?.title;

            return (
              <ProductCard
                key={product.id}
                variantId={product.variants.nodes[0].id}
                productLink={product.handle}
                title={product.title}
                image={product.images.nodes[0]?.url}
                collection={collectionTitle}
                currency={price.currencyCode}
                price={price.amount}
              />
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
