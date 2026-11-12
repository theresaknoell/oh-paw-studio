-- My Paw Space: Datenbankschema für Supabase (ENTWURF, noch nicht getestet).
-- Wird beim Livegang im Supabase-Dashboard unter "SQL Editor" ausgeführt.
-- Anmeldung übernimmt Supabase Auth (auth.users), Daten sind je Konto per Row Level Security getrennt.

create table public.cats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  name text not null check (char_length(name) between 1 and 80),
  birthday date,
  since date,
  notes text not null default '' check (char_length(notes) <= 500),
  created_at timestamptz not null default now()
);

create table public.memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  cat_id uuid not null references public.cats (id) on delete cascade,
  date date not null,
  category text not null check (category in ('first', 'everyday', 'milestone')),
  text text not null check (char_length(text) between 1 and 5000),
  created_at timestamptz not null default now()
);

-- Später: Zuordnung gekaufter Produkte zu einem Konto (Befüllung erst, wenn die Kauf-Verknüpfung entschieden ist).
create table public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_slug text not null,
  source text not null default 'gumroad',
  created_at timestamptz not null default now(),
  unique (user_id, product_slug)
);

alter table public.cats enable row level security;
alter table public.memories enable row level security;
alter table public.entitlements enable row level security;

create policy "own cats" on public.cats
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

create policy "own memories" on public.memories
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Käufe dürfen Nutzerinnen nur lesen, nicht selbst eintragen.
create policy "read own entitlements" on public.entitlements
  for select using (user_id = auth.uid());

create index on public.cats (user_id);
create index on public.memories (user_id, cat_id, date desc);
