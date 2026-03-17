import { MENU_QUERY } from "@/lib/graphql/queries";
import { shopifyFetch } from "@/lib/shopify";
import { GetMenuQuery } from "@/lib/types/storefront.generated";
import { cacheTag } from "next/cache";
import ClientNav from "./ClientNav";

async function getNavLinks() {
  "use cache";
  cacheTag("shopify-menu");

  const data = await shopifyFetch<GetMenuQuery>({
    query: MENU_QUERY,
    variables: { handle: "main-menu" },
  });

  return data?.menu?.items || [];
}

const Navbar = async () => {
  const menuItems = await getNavLinks();

  return <ClientNav menuItems={menuItems} />;
};

export default Navbar;
