alter table public.profiles
  add column if not exists emergency_name text,
  add column if not exists emergency_phone text,
  add column if not exists neighborhood text,
  add column if not exists home_address text;

with latest_pet as (
  select distinct on (owner_id)
    owner_id,
    owner_whatsapp,
    owner_phone,
    emergency_name,
    emergency_phone,
    neighborhood,
    home_address
  from public.pets
  order by owner_id, updated_at desc, created_at desc
)
update public.profiles profiles
set
  whatsapp = coalesce(profiles.whatsapp, nullif(latest_pet.owner_whatsapp, '')),
  phone = coalesce(profiles.phone, nullif(latest_pet.owner_phone, '')),
  emergency_name = coalesce(profiles.emergency_name, nullif(latest_pet.emergency_name, '')),
  emergency_phone = coalesce(profiles.emergency_phone, nullif(latest_pet.emergency_phone, '')),
  neighborhood = coalesce(profiles.neighborhood, nullif(latest_pet.neighborhood, '')),
  home_address = coalesce(profiles.home_address, nullif(latest_pet.home_address, ''))
from latest_pet
where profiles.id = latest_pet.owner_id;

alter table public.pets
  alter column owner_whatsapp drop not null;

alter table public.pets
  drop constraint if exists pets_owner_whatsapp_not_blank;

create or replace function public.get_finder_pet_profile(lookup_tag_code text)
returns table (
  pet_id uuid,
  tag_code text,
  name text,
  breed text,
  age text,
  color text,
  city text,
  personality text,
  owner_whatsapp text,
  owner_phone text,
  emergency_name text,
  emergency_phone text,
  vet_contact text,
  is_lost boolean,
  lost_since timestamptz,
  reward text,
  last_seen text,
  last_seen_when text,
  extra_note text,
  last_seen_at timestamptz,
  primary_photo_path text
)
language sql
security definer
stable
set search_path = ''
as $$
  select
    pets.id as pet_id,
    pets.tag_code,
    pets.name,
    pets.breed,
    pets.age,
    pets.color,
    pets.city,
    pets.personality,
    coalesce(profiles.whatsapp, pets.owner_whatsapp) as owner_whatsapp,
    coalesce(profiles.phone, pets.owner_phone) as owner_phone,
    coalesce(profiles.emergency_name, pets.emergency_name) as emergency_name,
    coalesce(profiles.emergency_phone, pets.emergency_phone) as emergency_phone,
    pets.vet_contact,
    pets.is_lost,
    active_report.since as lost_since,
    active_report.reward,
    active_report.last_seen,
    active_report.last_seen_when,
    active_report.extra_note,
    active_report.last_seen_at,
    primary_photo.storage_path as primary_photo_path
  from public.pets
  left join public.profiles
    on profiles.id = pets.owner_id
  left join lateral (
    select
      lost_pet_reports.since,
      lost_pet_reports.reward,
      lost_pet_reports.last_seen,
      lost_pet_reports.last_seen_when,
      lost_pet_reports.extra_note,
      lost_pet_reports.last_seen_at
    from public.lost_pet_reports
    where lost_pet_reports.pet_id = pets.id
      and lost_pet_reports.status = 'active'
    order by lost_pet_reports.since desc
    limit 1
  ) active_report on true
  left join lateral (
    select pet_photos.storage_path
    from public.pet_photos
    where pet_photos.pet_id = pets.id
    order by pet_photos.is_primary desc, pet_photos.display_order asc, pet_photos.created_at asc
    limit 1
  ) primary_photo on true
  where pets.tag_code = upper(btrim(lookup_tag_code))
  limit 1;
$$;

revoke all on function public.get_finder_pet_profile(text) from public;
grant execute on function public.get_finder_pet_profile(text) to anon, authenticated;
