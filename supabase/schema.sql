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

-- Erinnerungsbuch: eine Zeile je beantworteter Frage und je Kapitelfoto (Kapitel und Fragen stehen in src/data/paw-book.ts).
create table public.book_entries (
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  cat_id uuid not null references public.cats (id) on delete cascade,
  chapter_id text not null,
  prompt_id text not null,
  text text not null check (char_length(text) <= 5000),
  updated_at timestamptz not null default now(),
  primary key (cat_id, chapter_id, prompt_id)
);

create table public.book_photos (
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  cat_id uuid not null references public.cats (id) on delete cascade,
  chapter_id text not null,
  storage_path text not null, -- Datei liegt in Supabase Storage
  primary key (cat_id, chapter_id)
);

alter table public.book_entries enable row level security;
alter table public.book_photos enable row level security;
create policy "own book entries" on public.book_entries
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own book photos" on public.book_photos
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());

-- Pflege-Journal (Entwurf): Profil, Gewicht, Gesundheitseinträge, Medikamente je Katze.
create table public.care_profiles (
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  cat_id uuid primary key references public.cats (id) on delete cascade,
  chip text not null default '', vet_name text not null default '', vet_phone text not null default '',
  emergency text not null default '', food text not null default '', notes text not null default ''
);
create table public.weights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  cat_id uuid not null references public.cats (id) on delete cascade,
  date date not null, kg numeric(5,2) not null check (kg > 0 and kg <= 30)
);
create table public.health_records (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  cat_id uuid not null references public.cats (id) on delete cascade,
  date date not null, kind text not null check (kind in ('vaccination', 'checkup', 'treatment', 'other')),
  text text not null check (char_length(text) <= 2000)
);
create table public.medications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  cat_id uuid not null references public.cats (id) on delete cascade,
  name text not null, dose text not null default '', start date, "end" date, notes text not null default ''
);
alter table public.care_profiles enable row level security;
alter table public.weights enable row level security;
alter table public.health_records enable row level security;
alter table public.medications enable row level security;
create policy "own care profiles" on public.care_profiles for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own weights" on public.weights for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own health records" on public.health_records for all using (user_id = auth.uid()) with check (user_id = auth.uid());
create policy "own medications" on public.medications for all using (user_id = auth.uid()) with check (user_id = auth.uid());

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
