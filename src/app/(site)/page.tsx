import { StoreHome } from "@/components/store/store-home";
import { getLocalStoreCatalog, getTrendingProducts } from "@/lib/data/local-store-catalog";

export default function HomePage() {
  const { men, kids, streetwear } = getLocalStoreCatalog();
  const trending = getTrendingProducts();

  return (
    <StoreHome
      men={men}
      kids={kids}
      streetwear={streetwear}
      trending={trending}
      totalCount={men.length + kids.length + streetwear.length}
    />
  );
}
