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
    <div className="flex flex-wrap items-center gap-2">
      <Link
        href={"?"}
        className={`px-8 py-3 border rounded-full text-sm text-foreground font-light hover:border-foreground/10 transition-colors duration-300 ease-in-out ${currentFilter === "all" ? "border-foreground/10" : "border-transparent"}`}
      >
        All Collections
      </Link>
      {collections.map((collection: any) => {
        const isActive = currentFilter === collection.handle;

        return (
          <Link
            key={collection.id}
            href={`?collection=${collection.handle}`}
            className={`px-6 py-3 border rounded-full text-sm text-foreground font-light hover:border-foreground/10 transition-colors duration-300 ease-in-out ${isActive ? "border-foreground/10" : "border-transparent"}`}
          >
            {collection.title}
          </Link>
        );
      })}
    </div>
  );
};

export default FilterButtons;
