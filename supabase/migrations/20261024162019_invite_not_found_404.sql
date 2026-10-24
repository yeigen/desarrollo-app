create or replace function public.invite_to_budget(email text)
returns void
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
end;
$$;
