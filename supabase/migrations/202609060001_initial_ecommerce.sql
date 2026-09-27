-- Multi-landing ecommerce schema. Apply with `supabase db push`.
create extension if not exists pgcrypto;

create type public.order_status as enum (
  'pending', 'confirmed', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'returned'
);
create type public.delivery_type as enum ('home', 'office');
create type public.conversion_status as enum ('not_required', 'pending', 'sent', 'failed');

create table public.admin_users (
  user_id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'admin' check (role in ('admin', 'manager')),
  created_at timestamptz not null default now()
);

create table public.products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text,
  price numeric(12,2) not null check (price >= 0),
  currency char(3) not null default 'DZD',
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.landing_pages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique check (slug ~ '^[a-z0-9]+(?:-[a-z0-9]+)*$'),
  description text,
  product_id uuid references public.products(id) on delete set null,
  active boolean not null default true,
  meta_pixel_id text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.orders (
  id uuid primary key default gen_random_uuid(),
  landing_page_id uuid not null references public.landing_pages(id) on delete restrict,
  product_id uuid not null references public.products(id) on delete restrict,
  customer_name text not null check (char_length(trim(customer_name)) between 2 and 160),
  phone text not null check (char_length(trim(phone)) between 8 and 32),
  wilaya text not null,
  commune text not null,
  address text,
  quantity integer not null default 1 check (quantity > 0 and quantity <= 50),
  product_price numeric(12,2) not null check (product_price >= 0),
  delivery_fee numeric(12,2) not null check (delivery_fee >= 0),
  total_amount numeric(12,2) not null check (total_amount >= 0),
  delivery_type public.delivery_type not null,
  yalidine_tracking_number text,
  status public.order_status not null default 'pending',
  delivered_at timestamptz,
  browser_event_id uuid,
  idempotency_key uuid not null unique,
  purchase_event_sent boolean not null default false,
  purchase_event_sent_at timestamptz,
  purchase_event_id uuid,
  purchase_event_error text,
  purchase_conversion_status public.conversion_status not null default 'not_required',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint delivered_requires_date check (status <> 'delivered' or delivered_at is not null)
);

create table public.order_status_history (
  id bigint generated always as identity primary key,
  order_id uuid not null references public.orders(id) on delete cascade,
  old_status public.order_status,
  new_status public.order_status not null,
  changed_by uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now()
);

create index orders_created_at_idx on public.orders(created_at desc);
create index orders_status_idx on public.orders(status);
create index orders_landing_page_idx on public.orders(landing_page_id);
create index orders_product_idx on public.orders(product_id);
create index orders_wilaya_idx on public.orders(wilaya);

create or replace function public.is_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.admin_users where user_id = auth.uid())
$$;

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$ begin new.updated_at = now(); return new; end $$;
create trigger products_updated_at before update on public.products for each row execute function public.set_updated_at();
create trigger landing_pages_updated_at before update on public.landing_pages for each row execute function public.set_updated_at();
create trigger orders_updated_at before update on public.orders for each row execute function public.set_updated_at();

create or replace function public.order_status_audit()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  if new.status is distinct from old.status then
    insert into public.order_status_history(order_id, old_status, new_status, changed_by)
    values (new.id, old.status, new.status, auth.uid());
  end if;
  return new;
end $$;
create trigger orders_status_audit after update on public.orders for each row execute function public.order_status_audit();

alter table public.admin_users enable row level security;
alter table public.products enable row level security;
alter table public.landing_pages enable row level security;
alter table public.orders enable row level security;
alter table public.order_status_history enable row level security;

-- RLS decides which rows are visible; these grants allow PostgREST to reach the tables.
grant usage on schema public to anon, authenticated;
grant select on public.products, public.landing_pages to anon, authenticated;
grant select, insert, update, delete on public.products, public.landing_pages, public.orders, public.order_status_history to authenticated;
grant select on public.admin_users to authenticated;
grant usage, select on all sequences in schema public to authenticated;

-- Public visitors can resolve only active pages/products. Orders are always created by Edge Function.
create policy "read active products" on public.products for select using (active or public.is_admin());
create policy "admins manage products" on public.products for all using (public.is_admin()) with check (public.is_admin());
create policy "read active landing pages" on public.landing_pages for select using (active or public.is_admin());
create policy "admins manage landing pages" on public.landing_pages for all using (public.is_admin()) with check (public.is_admin());
create policy "admins read orders" on public.orders for select using (public.is_admin());
create policy "admins read history" on public.order_status_history for select using (public.is_admin());
create policy "users read own admin record" on public.admin_users for select using (auth.uid() = user_id);

-- Bootstrap an admin after creating an Auth account in Supabase:
-- insert into public.admin_users (user_id) values ('AUTH_USER_UUID');
