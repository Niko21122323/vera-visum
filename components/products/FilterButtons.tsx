import { GET_COLLECTIONS_QUERY } from "@/lib/graphql/queries";
import { shopifyFetch } from "@/lib/shopify";
import Link from "next/link";

const FilterButtons = async ({ currentFilter }: { currentFilter: string }) => {
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
    <div className="flex flex-wrap items-center gap-6">
      <Link
        href={"?"}
        className={`text-base text-foreground font-light border-b hover:border-foreground/80 transition-colors duration-300 ease-in-out ${currentFilter === "all" ? "border-foreground/80" : "border-transparent"}`}
      >
        All Collections
      </Link>
      {collections.map((collection: any) => {
        const isActive = currentFilter === collection.handle;

        return (
          <Link
            key={collection.id}
            href={`?collection=${collection.handle}`}
            className={`text-base text-foreground font-light border-b hover:border-foreground/80 transition-colors duration-300 ease-in-out ${isActive ? "border-foreground/80" : "border-transparent"}`}
          >
            {collection.title}
          </Link>
        );
      })}
    </div>
  );
};

export default FilterButtons;
