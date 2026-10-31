create table public.purchases (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null default auth.uid() references public.profiles on delete cascade,
  store text not null check (char_length(store) between 1 and 100),
  branch text check (char_length(branch) <= 100),
  order_number text check (char_length(order_number) <= 100),
  purchased_at timestamptz not null,
  products_total integer check (products_total >= 0),
  delivery_total integer check (delivery_total >= 0),
  total integer not null check (total >= 0),
  payment_method text check (char_length(payment_method) <= 100),
  receipt_path text check (receipt_path like owner_id::text || '/%'),
  note text check (char_length(note) <= 1000),
  created_at timestamptz not null default now()
);

create index purchases_owner_id_purchased_at_idx on public.purchases (owner_id, purchased_at desc);

alter table public.purchases enable row level security;

revoke all on public.purchases from anon, authenticated;
grant select, insert, update, delete on public.purchases to authenticated;

create policy "Cada usuario maneja sus compras" on public.purchases
  for all to authenticated
  using (owner_id = (select auth.uid()))
  with check (owner_id = (select auth.uid()));

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('receipts', 'receipts', false, 10485760, array['application/pdf', 'image/jpeg', 'image/png', 'image/webp']);

create policy "Cada usuario lee sus comprobantes" on storage.objects
  for select to authenticated
  using (bucket_id = 'receipts' and (storage.foldername(name))[1] = (select auth.uid()::text));

create policy "Cada usuario sube sus comprobantes" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'receipts' and (storage.foldername(name))[1] = (select auth.uid()::text));

create policy "Cada usuario borra sus comprobantes" on storage.objects
  for delete to authenticated
  using (bucket_id = 'receipts' and (storage.foldername(name))[1] = (select auth.uid()::text));
