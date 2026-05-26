-- Run once in Supabase SQL Editor so signed-in users can add YOUR store products to cart.
-- Also run: supabase/seed_local_store.sql (or npm run gen:store-seed then run the file)

drop policy if exists "products_upsert_store_catalog" on public.products;
drop policy if exists "products_update_store_catalog" on public.products;

create policy "products_upsert_store_catalog"
  on public.products
  for insert
  to authenticated
  with check (id::text like '33333333-%');

create policy "products_update_store_catalog"
  on public.products
  for update
  to authenticated
  using (id::text like '33333333-%')
  with check (id::text like '33333333-%');
