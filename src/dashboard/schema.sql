-- Run this once in Supabase Studio: SQL Editor > New query > paste > Run.

create table if not exists public.orders (
  id          uuid primary key default gen_random_uuid(),
  created_at  timestamptz not null default now(),
  product     text not null,          -- e.g. 'phone-cleaning-kit', 'english-words-book'
  variant     text,                   -- e.g. 'man-baf', 'woman-connectbaf', 'engbook'
  name        text not null,
  phone       text not null,
  wilaya      text not null,
  commune     text not null,
  delivery    text not null default 'home',   -- 'home' | 'desk'
  quantity    int  not null,
  unit_price  int  not null,
  total       int  not null,
  status      text not null default 'new'     -- 'new' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled'
);

alter table public.orders enable row level security;

-- Your landing pages use the public "anon" key, so they need INSERT-only access.
-- They can never read, edit, or delete other people's orders with this key.
create policy "public can insert orders"
  on public.orders
  for insert
  to anon
  with check (true);

-- Only people logged into the dashboard (authenticated) can read or update orders.
create policy "authenticated can read orders"
  on public.orders
  for select
  to authenticated
  using (true);

create policy "authenticated can update orders"
  on public.orders
  for update
  to authenticated
  using (true);

-- Turn on Realtime for this table so the dashboard gets live INSERT/UPDATE events.
-- (Equivalent to: Database > Replication > toggle "orders" on, in Supabase Studio.)
alter publication supabase_realtime add table public.orders;
