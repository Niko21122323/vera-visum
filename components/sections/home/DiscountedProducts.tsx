import { cacheTag, cacheLife } from "next/cache";
import { shopifyFetch } from "@/lib/shopify";
import { GET_SALE_PRODUCTS_QUERY } from "@/lib/graphql/queries";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import ProductCard from "@/components/ProductCard";

const DiscountedProducts = async () => {
  "use cache";

  cacheLife("hours");
  cacheTag("sale-products");

  // Fetch 250 to make sure we get everything on sale
  const data = await shopifyFetch<any>({
    query: GET_SALE_PRODUCTS_QUERY,
    variables: { first: 250 },
  });

  const allNodes = data?.products?.nodes || [];

  // Double-check the math so only real discounts show up
  const products = allNodes.filter((product: any) => {
    const variant = product.variants.nodes[0];
    const price = parseFloat(variant?.price?.amount || "0");
    const compareAt = parseFloat(variant?.compareAtPrice?.amount || "0");
    return compareAt > price;
  });

  if (products.length === 0) return null;

  return (
    <section className="py-24 lg:py-36 xl:py-44">
      <div className="container mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between pb-10 sm:pb-14 gap-y-6">
          <h2 className="text-4xl lg:text-5xl xl:text-6xl leading-tight max-w-[450px] lg:max-w-[670px]">
            Archive Sale: Limited Designs
          </h2>
          <div className="w-fit max-sm:hidden">
            <PrimaryButton
              title="View All"
              link="/collections/all"
              theme="dark"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-8 sm:gap-y-12 gap-x-4 max-sm:pb-10">
          {products.map((product: any) => {
            const variant = product.variants.nodes[0];
            const price = variant.price;
            const compareAt = variant.compareAtPrice;
            const collectionTitle = product.collections?.nodes[0]?.title;

            // Calculate discount percentage for the tag
            const discountPercent = Math.round(
              ((parseFloat(compareAt.amount) - parseFloat(price.amount)) /
                parseFloat(compareAt.amount)) *
                100,
            );

            return (
              <ProductCard
                key={product.id}
                variantId={variant.id}
                productLink={product.handle}
                title={product.title}
                image={product.images.nodes[0]?.url}
                collection={collectionTitle}
                currency={price.currencyCode}
                price={price.amount}
                tag={`${discountPercent}% OFF`}
              />
            );
          })}
        </div>

        <div className="sm:hidden">
          <PrimaryButton
            title="View All"
            link="/collections/all"
            theme="dark"
          />
        </div>
      </div>
    </section>
  );
};

export default DiscountedProducts;
