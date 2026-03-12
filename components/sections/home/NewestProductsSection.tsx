import { cacheTag, cacheLife } from "next/cache";
import { shopifyFetch } from "@/lib/shopify";

import { GET_NEWEST_PRODUCTS_QUERY } from "@/lib/graphql/queries";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import ProductCard from "@/components/ProductCard";

const NewestProductsSection = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag("newest-products");

  const data = await shopifyFetch<any>({
    query: GET_NEWEST_PRODUCTS_QUERY,
    variables: { first: 3 },
  });

  const products = data?.products?.nodes || [];

  return (
    <section className="py-28">
      <div className="container mx-auto px-6">
        <div className="pb-10 sm:pb-14">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl leading-tight max-w-[450px] lg:max-w-[670px]">
            Our Most Coveted Designs, Chosen by You
          </h2>
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
      </div>
    </section>
  );
};

export default NewestProductsSection;
