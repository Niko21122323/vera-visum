import { GET_COLLECTIONS_QUERY } from "@/lib/graphql/queries";
import { shopifyFetch } from "@/lib/shopify";
import FilterDropdownUI from "../FilterDropdownUI";

export default async function FilterButtons() {
  "use cache";

  const data = await shopifyFetch<any>({
    query: GET_COLLECTIONS_QUERY,
    variables: { first: 25 },
  });

  const collections =
    data?.collections?.nodes?.filter(
      (col: any) => !["frontpage", "home-page"].includes(col.handle),
    ) || [];

  const options = [
    { label: "All Collections", value: "all" },
    ...collections.map((col: any) => ({ label: col.title, value: col.handle })),
    { label: "New Collection", value: "new" },
    { label: "Most Sold", value: "most-sold" },
    { label: "Discount", value: "discount" },
  ];

  return <FilterDropdownUI options={options} />;
}
