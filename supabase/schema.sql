-- My Paw Space: Datenbankschema für Supabase (Projekt "oh-paw-studio", Region Frankfurt).
-- Spiegelt den Datenaufbau von src/lib/paw-store.ts. Anmeldung übernimmt Supabase Auth (auth.users);
-- jede Tabelle ist per Row Level Security auf das eigene Konto beschränkt. Fotos liegen im privaten Storage-Bucket "photos".
-- Stand: auf das Projekt angewendet (Migration "my_paw_space_schema"). Änderungen immer als neue Migration, nicht hier überschreiben.

create table public.cats (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  name text not null check (char_length(name) between 1 and 80),
  birthday date,
  since date,
  notes text not null default '' check (char_length(notes) <= 500),
  photo_path text, -- Datei im Bucket "photos": <user_id>/<datei>
  created_at timestamptz not null default now()
);

create table public.memories (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  cat_id uuid not null references public.cats (id) on delete cascade,
  date date not null,
  category text not null check (category in ('first', 'everyday', 'milestone')),
  text text not null check (char_length(text) between 1 and 5000),
  photo_path text,
  created_at timestamptz not null default now()
);

-- Erinnerungsbuch: eine Zeile je beantwortetem Feld. "key" ist der Schlüssel aus src/data/paw-book-core.ts (answerKey ohne Katzen-ID),
-- z. B. "m1|p1.f1", Listen "k4|p1.f4.2", Tabellen als JSON-Text.
create table public.book_answers (
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  cat_id uuid not null references public.cats (id) on delete cascade,
  key text not null check (char_length(key) <= 80),
  value text not null check (char_length(value) <= 20000),
  updated_at timestamptz not null default now(),
  primary key (cat_id, key)
);

create table public.book_photos (
  user_id uuid not null references auth.users (id) on delete cascade default auth.uid(),
  cat_id uuid not null references public.cats (id) on delete cascade,
  key text not null check (char_length(key) <= 80),
  photo_path text not null,
  primary key (cat_id, key)
);

-- Pflege-Journal
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
  name text not null check (char_length(name) <= 200), dose text not null default '', start date, "end" date, notes text not null default ''
);

-- Zuordnung gekaufter Produkte zu einem Konto (wird erst befüllt, wenn die Kauf-Verknüpfung entschieden ist).
create table public.entitlements (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  product_slug text not null,
  source text not null default 'gumroad',
  created_at timestamptz not null default now(),
  unique (user_id, product_slug)
);

-- Row Level Security: jede Person sieht und ändert nur eigene Zeilen
alter table public.cats enable row level security;
alter table public.memories enable row level security;
alter table public.book_answers enable row level security;
alter table public.book_photos enable row level security;
alter table public.care_profiles enable row level security;
alter table public.weights enable row level security;
alter table public.health_records enable row level security;
alter table public.medications enable row level security;
alter table public.entitlements enable row level security;

create policy "own cats" on public.cats for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own memories" on public.memories for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own book answers" on public.book_answers for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own book photos" on public.book_photos for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own care profiles" on public.care_profiles for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own weights" on public.weights for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own health records" on public.health_records for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
create policy "own medications" on public.medications for all to authenticated using (user_id = (select auth.uid())) with check (user_id = (select auth.uid()));
-- Käufe dürfen Nutzerinnen nur lesen, nicht selbst eintragen.
create policy "read own entitlements" on public.entitlements for select to authenticated using (user_id = (select auth.uid()));

-- Indizes für Fremdschlüssel und häufige Abfragen
create index on public.cats (user_id);
create index on public.memories (user_id);
create index on public.memories (cat_id, date desc);
create index on public.book_answers (user_id);
create index on public.book_photos (user_id);
create index on public.care_profiles (user_id);
create index on public.weights (user_id);
create index on public.weights (cat_id, date);
create index on public.health_records (user_id);
create index on public.health_records (cat_id, date);
create index on public.medications (user_id);
create index on public.medications (cat_id);
create index on public.entitlements (user_id);

-- Privater Foto-Speicher: Dateien liegen unter <user_id>/..., nur die eigene Person darf lesen und schreiben.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('photos', 'photos', false, 3145728, array['image/jpeg', 'image/png', 'image/webp'])
on conflict (id) do nothing;

create policy "own photos read" on storage.objects for select to authenticated
  using (bucket_id = 'photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "own photos write" on storage.objects for insert to authenticated
  with check (bucket_id = 'photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "own photos update" on storage.objects for update to authenticated
  using (bucket_id = 'photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
create policy "own photos delete" on storage.objects for delete to authenticated
  using (bucket_id = 'photos' and (storage.foldername(name))[1] = (select auth.uid())::text);
