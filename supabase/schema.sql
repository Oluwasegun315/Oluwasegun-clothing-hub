-- OLUWASEGUN CLOTHING HUB — run in Supabase SQL Editor (Dashboard → SQL)
-- Creates profiles, products, cart_items, RLS, profile sync trigger, and seed products.

-- ---------------------------------------------------------------------------
-- TABLES
-- ---------------------------------------------------------------------------

create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  full_name text,
  email text,
  avatar_url text
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text,
  image_url text,
  image_hover_url text,
  price numeric(12, 2) not null,
  category text,
  gender text,
  age_group text,
  rating numeric(3, 2),
  is_trending boolean default false,
  badge text,
  color_name text,
  sizes_available text,
  created_at timestamptz not null default now()
);

-- Idempotent extensions for databases created before marketplace columns
alter table public.products add column if not exists image_hover_url text;
alter table public.products add column if not exists age_group text;
alter table public.products add column if not exists rating numeric(3, 2);
alter table public.products add column if not exists is_trending boolean default false;
alter table public.products add column if not exists badge text;
alter table public.products add column if not exists color_name text;
alter table public.products add column if not exists sizes_available text;

create table if not exists public.cart_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users on delete cascade,
  product_id uuid not null references public.products on delete cascade,
  quantity int not null default 1 check (quantity > 0),
  unique (user_id, product_id)
);

-- ---------------------------------------------------------------------------
-- ROW LEVEL SECURITY
-- ---------------------------------------------------------------------------

alter table public.profiles enable row level security;
alter table public.products enable row level security;
alter table public.cart_items enable row level security;

-- Profiles: each user can read/update their own row
create policy "profiles_select_own"
  on public.profiles for select
  using (auth.uid() = id);

create policy "profiles_update_own"
  on public.profiles for update
  using (auth.uid() = id);

create policy "profiles_insert_own"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Products: public read (marketplace catalog)
create policy "products_select_all"
  on public.products for select
  using (true);

-- Cart: users manage only their cart
create policy "cart_select_own"
  on public.cart_items for select
  using (auth.uid() = user_id);

create policy "cart_insert_own"
  on public.cart_items for insert
  with check (auth.uid() = user_id);

create policy "cart_update_own"
  on public.cart_items for update
  using (auth.uid() = user_id);

create policy "cart_delete_own"
  on public.cart_items for delete
  using (auth.uid() = user_id);

-- ---------------------------------------------------------------------------
-- PROFILE SYNC (mirror auth.users → profiles)
-- ---------------------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', ''),
    new.email,
    coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', null)
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(excluded.full_name, public.profiles.full_name),
        avatar_url = coalesce(excluded.avatar_url, public.profiles.avatar_url);
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Keep profile email in sync when auth email changes
create or replace function public.handle_user_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.profiles
    set email = new.email,
        full_name = coalesce(new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'name', public.profiles.full_name),
        avatar_url = coalesce(new.raw_user_meta_data->>'avatar_url', new.raw_user_meta_data->>'picture', public.profiles.avatar_url)
  where id = new.id;
  return new;
end;
$$;

drop trigger if exists on_auth_user_updated on auth.users;
create trigger on_auth_user_updated
  after update on auth.users
  for each row execute function public.handle_user_update();

-- ---------------------------------------------------------------------------
-- STORAGE (optional — product/avatar images; use Dashboard to create buckets)
-- ---------------------------------------------------------------------------
-- Suggested buckets: "avatars" (public), "product-images" (public)
-- Policies: authenticated users can upload to own folder under avatars/

-- ---------------------------------------------------------------------------
-- SEED PRODUCTS (premium fashion placeholders — replace URLs as needed)
-- ---------------------------------------------------------------------------

insert into public.products (name, description, image_url, price, category, gender)
values
  ('Obsidian Line Overcoat', 'Architectural silhouette, fluid drape, cold-weather statement.', 'https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=1200&q=80', 428.00, 'Outerwear', 'Unisex'),
  ('Noir Atelier Tailored Suit', 'Precision-cut tailoring for boardroom-to-gallery nights.', 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1200&q=80', 689.00, 'Formal', 'Men'),
  ('Lunar Silk Evening Dress', 'Liquid silk, minimal lines, maximum presence.', 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&q=80', 512.00, 'Evening', 'Women'),
  ('Velocity Tech Sneaker', 'Sculpted sole, matte-black panels, runway energy.', 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=1200&q=80', 198.00, 'Footwear', 'Unisex'),
  ('Monolith Leather Tote', 'Heavy-grain leather, silent hardware, everyday luxury.', 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&q=80', 320.00, 'Accessories', 'Women'),
  ('Meridian Knit Set', 'Relaxed structure, tonal layers, tactile comfort.', 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&q=80', 245.00, 'Knitwear', 'Women'),
  ('Carbon Street Hoodie', 'Oversized drop, premium fleece, street-luxury hybrid.', 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80', 168.00, 'Streetwear', 'Men'),
  ('Apex Running Shell', 'Breathable membrane, reflective seams, motion-first design.', 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=80', 210.00, 'Active', 'Unisex');
