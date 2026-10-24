alter table public.profiles add column email text;

update public.profiles
set email = users.email
from auth.users
where users.id = profiles.id;

alter table public.profiles alter column email set not null;
alter table public.profiles add constraint profiles_email_key unique (email);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, name, email)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'name', split_part(new.email, '@', 1)), new.email);
  return new;
end;
$$;

create table public.budget_members (
  owner_id uuid not null references public.profiles on delete cascade,
  member_id uuid not null references public.profiles on delete cascade,
  created_at timestamptz not null default now(),
  primary key (owner_id, member_id),
  check (owner_id <> member_id)
);

create index budget_members_member_id_idx on public.budget_members (member_id);

create table public.budget_items (
  owner_id uuid not null references public.profiles on delete cascade,
  offer_key text not null,
  offer jsonb not null,
  quantity integer not null check (quantity between 1 and 999),
  created_at timestamptz not null default now(),
  primary key (owner_id, offer_key)
);

alter table public.budget_members enable row level security;
alter table public.budget_items enable row level security;

revoke all on public.budget_members, public.budget_items from anon, authenticated;
grant select on public.budget_members to authenticated;
grant select, insert, update, delete on public.budget_items to authenticated;

create schema private;
grant usage on schema private to authenticated;

create function private.budget_owner_ids()
returns setof uuid
language sql
security definer set search_path = ''
stable
as $$
  select (select auth.uid())
  union
  select owner_id from public.budget_members where member_id = (select auth.uid())
$$;

create function private.budget_people()
returns setof uuid
language sql
security definer set search_path = ''
stable
as $$
  select private.budget_owner_ids()
  union
  select member_id from public.budget_members where owner_id in (select private.budget_owner_ids())
$$;

revoke execute on function private.budget_owner_ids(), private.budget_people() from public, anon;
grant execute on function private.budget_owner_ids(), private.budget_people() to authenticated;

create policy "Cada usuario ve quién tiene acceso a sus presupuestos" on public.budget_members
  for select to authenticated
  using (owner_id in (select private.budget_owner_ids()));

create policy "Cada usuario edita los presupuestos a los que tiene acceso" on public.budget_items
  for all to authenticated
  using (owner_id in (select private.budget_owner_ids()))
  with check (owner_id in (select private.budget_owner_ids()));

drop policy "Cada usuario lee su perfil" on public.profiles;

create policy "Cada usuario lee los perfiles de sus presupuestos" on public.profiles
  for select to authenticated
  using (id in (select private.budget_people()));

create function public.invite_to_budget(email text)
returns void
language plpgsql
security definer set search_path = ''
as $$
declare
  member uuid;
begin
  select id into member from public.profiles where profiles.email = lower(invite_to_budget.email);
  if member is null then
    raise exception 'No hay una cuenta con ese correo' using errcode = 'P0002';
  end if;
  insert into public.budget_members (owner_id, member_id)
  values ((select auth.uid()), member)
  on conflict do nothing;
end;
$$;

revoke execute on function public.invite_to_budget(text) from public, anon;
grant execute on function public.invite_to_budget(text) to authenticated;

alter table public.budget_items replica identity full;

alter publication supabase_realtime add table public.budget_items, public.budget_members;
