grant select on public.push_tokens to authenticated;

create policy "Cada usuario ve sus tokens" on public.push_tokens
  for select to authenticated
  using ((select auth.uid()) = user_id);
