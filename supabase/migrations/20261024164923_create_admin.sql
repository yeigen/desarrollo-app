create table public.stores (
  id text primary key,
  enabled boolean not null default true
);

insert into public.stores (id) values ('exito'), ('carulla'), ('olimpica'), ('jumbo'), ('d1'), ('mercamio');

create table public.searches (
  id bigint generated always as identity primary key,
  user_id uuid not null default auth.uid() references public.profiles on delete cascade,
  created_at timestamptz not null default now()
);

create index searches_created_at_idx on public.searches (created_at);
create index searches_user_id_idx on public.searches (user_id);

alter table public.stores enable row level security;
alter table public.searches enable row level security;

revoke all on public.stores, public.searches from anon, authenticated;
grant select on public.stores to authenticated;
grant update (enabled) on public.stores to authenticated;
grant insert on public.searches to authenticated;

create function private.is_admin()
returns boolean
language sql
security definer set search_path = ''
stable
as $$
  select exists (select 1 from public.profiles where id = (select auth.uid()) and role = 'admin')
$$;

revoke execute on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;

create policy "Cada usuario ve las tiendas" on public.stores
  for select to authenticated
  using (true);

create policy "Solo el admin activa o desactiva tiendas" on public.stores
  for update to authenticated
  using ((select private.is_admin()))
  with check ((select private.is_admin()));

create policy "Cada usuario registra sus búsquedas" on public.searches
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create function public.admin_stats()
returns table (users bigint, searches_today bigint, shared_budgets bigint)
language plpgsql
security definer set search_path = ''
stable
as $$
begin
  if not private.is_admin() then
    raise sqlstate 'PT403' using message = 'Solo para administradores';
  end if;
  return query select
    (select count(*) from public.profiles),
    (select count(*) from public.searches
      where created_at >= (now() at time zone 'America/Bogota')::date at time zone 'America/Bogota'),
    (select count(distinct owner_id) from public.budget_members);
end;
$$;

revoke execute on function public.admin_stats() from public, anon;
grant execute on function public.admin_stats() to authenticated;

alter publication supabase_realtime add table public.stores;
