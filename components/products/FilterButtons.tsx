// components/products/FilterButtons.tsx
import { GET_COLLECTIONS_QUERY } from "@/lib/graphql/queries";
import { shopifyFetch } from "@/lib/shopify";
import FilterDropdownUI from "../FilterDropdown";

export default async function FilterButtons({
  currentFilter,
}: {
  currentFilter: string;
}) {
  "use cache";

  const data = await shopifyFetch<any>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first: 20 },
  });

  const collections =
    data?.collections?.nodes?.filter(
      (col: any) => !["frontpage", "home-page"].includes(col.handle)
    ) || [];

  const options = [
    { label: "All Collections", value: "all" },
    ...collections.map((col: any) => ({ label: col.title, value: col.handle })),
    { label: "New Collection", value: "new" },
    { label: "Most Sold", value: "most-sold" },
    { label: "Discount", value: "discount" },
  ];

  return <FilterDropdownUI currentFilter={currentFilter} options={options} />;
}
