delete from public.purchases where receipt_path is null;

alter table public.purchases
  drop column store,
  drop column branch,
  drop column order_number,
  drop column products_total,
  drop column delivery_total,
  drop column total,
  drop column payment_method,
  drop column note,
  alter column purchased_at set default now(),
  alter column receipt_path set not null;
