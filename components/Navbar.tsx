import { MENU_QUERY } from "@/lib/graphql/queries";
import { shopifyFetch } from "@/lib/shopify";
import { GetMenuQuery } from "@/lib/types/storefront.generated";
import { cacheTag } from "next/cache";
import Link from "next/link";
import CartButton from "./buttons/CartButton";
import { IoMenu } from "react-icons/io5";

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
  const getRelativeUrl = (url: string) => {
    return url.replace(/^(?:\/\/|[^\/+])*\//, "/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full h-auto z-50">
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between gap-16 py-8">
          <Link
            href="/"
            className="text-background text-2xl sm:text-3xl md:text-4xl font-heading"
          >
            VeraVisum
          </Link>
          <div className="flex items-center gap-6 lg:gap-12">
            <div className="flex items-center gap-12 max-lg:hidden">
              {menuItems.map((item) => (
                <Link
                  key={item.title}
                  href={getRelativeUrl(item.url)}
                  className="text-white text-lg font-light"
                >
                  {item.title}
                </Link>
              ))}
            </div>
            <CartButton theme="light" />
            <button type="button" className="cursor-pointer block lg:hidden">
              <IoMenu className="text-background text-3xl" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
