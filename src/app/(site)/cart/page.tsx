import { redirect } from "next/navigation";

import { getCartLines } from "@/lib/data/cart";
import { CartView } from "@/components/shop/cart-view";

export default async function CartPage() {
  const { user, lines } = await getCartLines();
  if (!user) redirect("/login?next=/cart");

  return <CartView initialLines={lines} />;
}
