drop function if exists public.get_finder_pet_profile(text);

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
  neighborhood text,
  is_lost boolean,
  lost_since timestamptz,
  reward text,
  last_seen text,
  last_seen_when text,
  extra_note text,
  last_seen_at timestamptz,
  photo_paths text[]
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
    coalesce(profiles.neighborhood, pets.neighborhood) as neighborhood,
    pets.is_lost,
    active_report.since as lost_since,
    active_report.reward,
    active_report.last_seen,
    active_report.last_seen_when,
    active_report.extra_note,
    active_report.last_seen_at,
    coalesce(photo_list.photo_paths, array[]::text[]) as photo_paths
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
    select array_agg(
      ordered_photos.storage_path
      order by ordered_photos.is_primary desc, ordered_photos.display_order asc, ordered_photos.created_at asc
    ) as photo_paths
    from public.pet_photos ordered_photos
    where ordered_photos.pet_id = pets.id
  ) photo_list on true
  where pets.tag_code = upper(btrim(lookup_tag_code))
  limit 1;
$$;

revoke all on function public.get_finder_pet_profile(text) from public;
grant execute on function public.get_finder_pet_profile(text) to anon, authenticated;
