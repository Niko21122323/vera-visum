import { shopifyFetch } from "@/lib/shopify";
import { GET_BEST_SELLING_PRODUCTS_QUERY } from "@/lib/graphql/queries";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/buttons/AddToCartButton";
import { cacheTag, cacheLife } from "next/cache";

export default async function MostSold() {
  "use cache";
  cacheLife("hours");
  cacheTag("best-sellers");

  const data = await shopifyFetch<any>({
    query: GET_BEST_SELLING_PRODUCTS_QUERY,
    variables: { first: 3 },
  });

  const products = data?.products?.nodes || [];

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-heading text-center mb-12">
          The Favorites
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {products.map((product: any) => {
            const variantId = product.variants.nodes[0]?.id;
            const price = product.priceRange.minVariantPrice;
            const collectionTitle = product.collections?.nodes[0]?.title;

            return (
              <div key={product.id} className="flex flex-col group">
                <Link
                  href={`/product/${product.handle}`}
                  className="flex flex-col flex-1"
                >
                  <div className="relative aspect-square overflow-hidden mb-4 rounded-sm bg-secondary">
                    <Image
                      src={product.images.nodes[0]?.url || "/placeholder.png"}
                      alt={product.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 bg-background/90 backdrop-blur-sm px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
                      Bestseller
                    </div>
                  </div>

                  <div className="flex flex-col gap-1 mb-4">
                    <h3 className="font-heading text-xl">{product.title}</h3>
                    {collectionTitle && (
                      <span className="text-xs text-muted-foreground uppercase tracking-wider">
                        {collectionTitle}
                      </span>
                    )}
                    <p className="font-medium text-foreground">
                      {new Intl.NumberFormat("en-US", {
                        style: "currency",
                        currency: price.currencyCode,
                        maximumFractionDigits: 0,
                      }).format(price.amount)}
                    </p>
                  </div>
                </Link>

                <AddToCartButton variantId={variantId} />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
