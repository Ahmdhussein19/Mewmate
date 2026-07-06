create extension if not exists pgcrypto with schema extensions;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create or replace function public.generate_pet_tag_code()
returns text
language plpgsql
set search_path = ''
as $$
declare
  alphabet constant text := 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';
  code text := '';
  char_pos int;
begin
  loop
    code := '';

    for char_pos in 1..6 loop
      code := code || substr(alphabet, floor(random() * length(alphabet) + 1)::int, 1);
    end loop;

    exit when not exists (
      select 1
      from public.pets
      where pets.tag_code = code
    );
  end loop;

  return code;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  display_name text,
  phone text,
  whatsapp text,
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.pets (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users(id) on delete cascade,
  tag_code text not null default public.generate_pet_tag_code(),
  name text not null,
  breed text,
  age text,
  color text,
  city text,
  personality text,
  owner_whatsapp text not null,
  owner_phone text,
  emergency_name text,
  emergency_phone text,
  vet_contact text,
  neighborhood text,
  home_address text,
  medical_notes text,
  is_lost boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pets_tag_code_unique unique (tag_code),
  constraint pets_tag_code_format check (tag_code ~ '^[A-Z2-9]{6}$'),
  constraint pets_name_not_blank check (length(btrim(name)) > 0),
  constraint pets_owner_whatsapp_not_blank check (length(btrim(owner_whatsapp)) > 0)
);

create table public.pet_photos (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  storage_bucket text not null default 'pet-photos',
  storage_path text not null,
  display_order integer not null default 0,
  is_primary boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint pet_photos_bucket_check check (storage_bucket = 'pet-photos'),
  constraint pet_photos_display_order_check check (display_order >= 0),
  constraint pet_photos_path_not_blank check (length(btrim(storage_path)) > 0),
  constraint pet_photos_pet_order_unique unique (pet_id, display_order),
  constraint pet_photos_storage_path_unique unique (storage_bucket, storage_path)
);

create table public.lost_pet_reports (
  id uuid primary key default gen_random_uuid(),
  pet_id uuid not null references public.pets(id) on delete cascade,
  owner_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'active',
  since timestamptz not null default now(),
  resolved_at timestamptz,
  reward text,
  last_seen text,
  last_seen_when text,
  extra_note text,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint lost_pet_reports_status_check check (status in ('active', 'resolved')),
  constraint lost_pet_reports_resolved_at_check check (
    (status = 'active' and resolved_at is null)
    or (status = 'resolved' and resolved_at is not null)
  )
);

create unique index lost_pet_reports_one_active_per_pet_idx
  on public.lost_pet_reports (pet_id)
  where status = 'active';

create index pets_owner_id_idx on public.pets (owner_id);
create index pets_tag_code_idx on public.pets (tag_code);
create index pet_photos_owner_id_idx on public.pet_photos (owner_id);
create index pet_photos_pet_id_idx on public.pet_photos (pet_id);
create index lost_pet_reports_owner_id_idx on public.lost_pet_reports (owner_id);
create index lost_pet_reports_pet_id_idx on public.lost_pet_reports (pet_id);
create index lost_pet_reports_active_pet_id_idx on public.lost_pet_reports (pet_id) where status = 'active';

create trigger profiles_set_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();

create trigger pets_set_updated_at
  before update on public.pets
  for each row execute function public.set_updated_at();

create trigger pet_photos_set_updated_at
  before update on public.pet_photos
  for each row execute function public.set_updated_at();

create trigger lost_pet_reports_set_updated_at
  before update on public.lost_pet_reports
  for each row execute function public.set_updated_at();

create or replace function public.handle_new_user_profile()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, phone, whatsapp, avatar_url)
  values (
    new.id,
    nullif(new.raw_user_meta_data ->> 'display_name', ''),
    nullif(new.raw_user_meta_data ->> 'phone', ''),
    nullif(new.raw_user_meta_data ->> 'whatsapp', ''),
    nullif(new.raw_user_meta_data ->> 'avatar_url', '')
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger auth_users_create_profile
  after insert on auth.users
  for each row execute function public.handle_new_user_profile();

create or replace function public.sync_pet_child_owner()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  owning_user uuid;
begin
  select owner_id
    into owning_user
    from public.pets
    where id = new.pet_id;

  if owning_user is null then
    raise exception 'pet % does not exist', new.pet_id;
  end if;

  new.owner_id := owning_user;
  return new;
end;
$$;

create trigger pet_photos_sync_owner
  before insert or update of pet_id on public.pet_photos
  for each row execute function public.sync_pet_child_owner();

create trigger lost_pet_reports_sync_owner
  before insert or update of pet_id on public.lost_pet_reports
  for each row execute function public.sync_pet_child_owner();

create or replace function public.set_pet_lost_status_from_reports()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  target_pet_id uuid;
begin
  target_pet_id := coalesce(new.pet_id, old.pet_id);

  update public.pets
    set is_lost = exists (
      select 1
      from public.lost_pet_reports
      where pet_id = target_pet_id
        and status = 'active'
    )
    where id = target_pet_id;

  return coalesce(new, old);
end;
$$;

create trigger lost_pet_reports_update_pet_status_insert
  after insert on public.lost_pet_reports
  for each row execute function public.set_pet_lost_status_from_reports();

create trigger lost_pet_reports_update_pet_status_update
  after update of status, pet_id on public.lost_pet_reports
  for each row execute function public.set_pet_lost_status_from_reports();

create trigger lost_pet_reports_update_pet_status_delete
  after delete on public.lost_pet_reports
  for each row execute function public.set_pet_lost_status_from_reports();
