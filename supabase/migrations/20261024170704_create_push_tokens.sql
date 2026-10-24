create table public.push_tokens (
  token text primary key,
  user_id uuid not null references public.profiles on delete cascade,
  updated_at timestamptz not null default now()
);

create index push_tokens_user_id_idx on public.push_tokens (user_id);

alter table public.push_tokens enable row level security;

revoke all on public.push_tokens from anon, authenticated;
grant delete on public.push_tokens to authenticated;

create policy "Cada usuario borra sus tokens" on public.push_tokens
  for delete to authenticated
  using ((select auth.uid()) = user_id);

create function public.save_push_token(token text)
returns void
language sql
security definer set search_path = ''
as $$
  insert into public.push_tokens (token, user_id)
  values (save_push_token.token, (select auth.uid()))
  on conflict on constraint push_tokens_pkey do update set user_id = excluded.user_id, updated_at = now();
$$;

revoke execute on function public.save_push_token(text) from public, anon;
grant execute on function public.save_push_token(text) to authenticated;

drop function public.invite_to_budget(text);

create function public.invite_to_budget(email text)
returns uuid
language plpgsql
security definer set search_path = ''
as $$
declare
  member uuid;
begin
  select id into member from public.profiles where profiles.email = lower(invite_to_budget.email);
  if member is null then
    raise sqlstate 'PT404' using message = 'No hay una cuenta con ese correo';
  end if;
  insert into public.budget_members (owner_id, member_id)
  values ((select auth.uid()), member)
  on conflict do nothing;
  return member;
end;
$$;

revoke execute on function public.invite_to_budget(text) from public, anon;
grant execute on function public.invite_to_budget(text) to authenticated;
