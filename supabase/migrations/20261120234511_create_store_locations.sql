create table public.store_locations (
  id text primary key,
  store_id text not null references public.stores on delete cascade,
  name text not null,
  address text,
  lat double precision not null check (lat between -90 and 90),
  lng double precision not null check (lng between -180 and 180)
);

create index store_locations_store_id_idx on public.store_locations (store_id);

alter table public.store_locations enable row level security;

revoke all on public.store_locations from anon, authenticated;
grant select, insert, update, delete on public.store_locations to authenticated;

create policy "Cada usuario ve las sedes" on public.store_locations
  for select to authenticated
  using (true);

create policy "Solo el admin agrega sedes" on public.store_locations
  for insert to authenticated
  with check ((select private.is_admin()));

create policy "Solo el admin edita sedes" on public.store_locations
  for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

create policy "Solo el admin borra sedes" on public.store_locations
  for delete to authenticated
  using ((select private.is_admin()));
