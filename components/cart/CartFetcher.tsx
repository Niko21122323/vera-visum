import { getCart } from "@/app/actions/cart";
import CartInitializer from "./CartInitializer";

export default async function CartFetcher() {
  const cart = await getCart();

  return <CartInitializer cart={cart} />;
}
