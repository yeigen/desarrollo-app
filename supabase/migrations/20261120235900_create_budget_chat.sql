create table public.budget_messages (
  id bigint generated always as identity primary key,
  owner_id uuid not null references public.profiles on delete cascade,
  sender_id uuid not null references public.profiles on delete cascade,
  body text not null,
  created_at timestamptz not null default now(),
  constraint budget_messages_body_check check (char_length(body) between 1 and 500 and body ~ '[^[:space:]]')
);

create index budget_messages_owner_id_idx on public.budget_messages (owner_id, id);

alter table public.budget_messages enable row level security;

revoke all on public.budget_messages from anon, authenticated;
grant select, insert on public.budget_messages to authenticated;

create policy "Cada usuario lee el chat de sus presupuestos" on public.budget_messages
  for select to authenticated
  using (owner_id in (select private.budget_owner_ids()));

create policy "Cada usuario escribe en el chat de sus presupuestos" on public.budget_messages
  for insert to authenticated
  with check (
    owner_id in (select private.budget_owner_ids())
    and sender_id = (select auth.uid())
  );

alter table public.budget_messages replica identity full;

alter publication supabase_realtime add table public.budget_messages;
