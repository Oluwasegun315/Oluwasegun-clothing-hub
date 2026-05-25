/** Row shapes aligned with `supabase/schema.sql` + marketplace extensions. */

export type Profile = {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
};

export type Product = {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  /** Second image for premium card hover swap */
  image_hover_url?: string | null;
  price: number;
  category: string | null;
  gender: string | null;
  /** `adult` | `kids` — shop mega-sections */
  age_group?: "adult" | "kids" | string | null;
  created_at: string;
  rating?: number | null;
  is_trending?: boolean | null;
  badge?: string | null;
  color_name?: string | null;
  sizes_available?: string | null;
};

export type CartItem = {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
};

export type CartItemWithProduct = CartItem & {
  product: Product | null;
};
