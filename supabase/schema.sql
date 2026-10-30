-- ============================================================
-- Jaur Studio — Supabase schema
-- Run this once in your Supabase project: SQL Editor → New query
-- → paste this whole file → Run.
--
-- STORAGE (do this in the dashboard, it cannot be done from SQL alone):
--   Storage → New bucket → name it "portfolio-images" → make it Public.
--   Upload project screenshots there, copy each file's public URL and
--   paste it into Admin → Content → Image URL.
--
-- ADMIN USER:
--   Authentication → Users → Add user → your email + a strong password.
--   That email/password is what you sign in with at /admin/login.
--   There is intentionally no public sign-up — only users you create
--   in the dashboard can sign in.
-- ============================================================

-- ---------- Tables ----------

create table if not exists public.enquiries (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  contact text not null,
  service text,
  message text,
  status text not null default 'New',
  created_at timestamptz not null default now()
);

create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  client_name text not null,
  service text,
  deadline date,
  total_amount numeric not null default 0,
  advance_paid numeric not null default 0,
  status text not null default 'New',
  created_at timestamptz not null default now()
);

create table if not exists public.payments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid references public.projects (id) on delete set null,
  amount numeric not null default 0,
  note text,
  paid_at date not null default current_date,
  created_at timestamptz not null default now()
);

create table if not exists public.portfolio_items (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  category text not null,
  image_url text,
  live_url text,
  badge text,
  is_published boolean not null default true,
  sort int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.services_content (
  id uuid primary key default gen_random_uuid(),
  service_key text not null unique,
  title text not null,
  description text,
  price_from text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  text text not null,
  rating int not null default 5 check (rating between 1 and 5),
  is_approved boolean not null default false,
  created_at timestamptz not null default now()
);

-- ---------- Row Level Security ----------

alter table public.enquiries enable row level security;
alter table public.projects enable row level security;
alter table public.payments enable row level security;
alter table public.portfolio_items enable row level security;
alter table public.services_content enable row level security;
alter table public.reviews enable row level security;

-- Public visitors (anon key): may ONLY send an enquiry.
drop policy if exists "anon can insert enquiries" on public.enquiries;
create policy "anon can insert enquiries"
  on public.enquiries for insert
  to anon
  with check (true);

-- Public visitors: may read only published portfolio items.
drop policy if exists "anon can read published portfolio" on public.portfolio_items;
create policy "anon can read published portfolio"
  on public.portfolio_items for select
  to anon
  using (is_published = true);

-- Public visitors: may read only published service content.
drop policy if exists "anon can read published services" on public.services_content;
create policy "anon can read published services"
  on public.services_content for select
  to anon
  using (is_published = true);

-- Public visitors: may read only approved reviews.
drop policy if exists "anon can read approved reviews" on public.reviews;
create policy "anon can read approved reviews"
  on public.reviews for select
  to anon
  using (is_approved = true);

-- Signed-in admin (you): full access to everything.
drop policy if exists "admin full access enquiries" on public.enquiries;
create policy "admin full access enquiries"
  on public.enquiries for all
  to authenticated
  using (true) with check (true);

drop policy if exists "admin full access projects" on public.projects;
create policy "admin full access projects"
  on public.projects for all
  to authenticated
  using (true) with check (true);

drop policy if exists "admin full access payments" on public.payments;
create policy "admin full access payments"
  on public.payments for all
  to authenticated
  using (true) with check (true);

drop policy if exists "admin full access portfolio" on public.portfolio_items;
create policy "admin full access portfolio"
  on public.portfolio_items for all
  to authenticated
  using (true) with check (true);

drop policy if exists "admin full access services" on public.services_content;
create policy "admin full access services"
  on public.services_content for all
  to authenticated
  using (true) with check (true);

drop policy if exists "admin full access reviews" on public.reviews;
create policy "admin full access reviews"
  on public.reviews for all
  to authenticated
  using (true) with check (true);
