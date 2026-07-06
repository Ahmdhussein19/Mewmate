alter table public.profiles enable row level security;
alter table public.pets enable row level security;
alter table public.pet_photos enable row level security;
alter table public.lost_pet_reports enable row level security;

create policy "profiles owner can select"
  on public.profiles for select
  to authenticated
  using ((select auth.uid()) = id);

create policy "profiles owner can insert"
  on public.profiles for insert
  to authenticated
  with check ((select auth.uid()) = id);

create policy "profiles owner can update"
  on public.profiles for update
  to authenticated
  using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create policy "profiles owner can delete"
  on public.profiles for delete
  to authenticated
  using ((select auth.uid()) = id);

create policy "pets owner can select"
  on public.pets for select
  to authenticated
  using ((select auth.uid()) = owner_id);

create policy "pets owner can insert"
  on public.pets for insert
  to authenticated
  with check ((select auth.uid()) = owner_id);

create policy "pets owner can update"
  on public.pets for update
  to authenticated
  using ((select auth.uid()) = owner_id)
  with check ((select auth.uid()) = owner_id);

create policy "pets owner can delete"
  on public.pets for delete
  to authenticated
  using ((select auth.uid()) = owner_id);

create policy "pet photos owner can select"
  on public.pet_photos for select
  to authenticated
  using ((select auth.uid()) = owner_id);

create policy "pet photos owner can insert"
  on public.pet_photos for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.pets
      where pets.id = pet_photos.pet_id
        and pets.owner_id = (select auth.uid())
    )
  );

create policy "pet photos owner can update"
  on public.pet_photos for update
  to authenticated
  using ((select auth.uid()) = owner_id)
  with check (
    exists (
      select 1
      from public.pets
      where pets.id = pet_photos.pet_id
        and pets.owner_id = (select auth.uid())
    )
  );

create policy "pet photos owner can delete"
  on public.pet_photos for delete
  to authenticated
  using ((select auth.uid()) = owner_id);

create policy "lost reports owner can select"
  on public.lost_pet_reports for select
  to authenticated
  using ((select auth.uid()) = owner_id);

create policy "lost reports owner can insert"
  on public.lost_pet_reports for insert
  to authenticated
  with check (
    exists (
      select 1
      from public.pets
      where pets.id = lost_pet_reports.pet_id
        and pets.owner_id = (select auth.uid())
    )
  );

create policy "lost reports owner can update"
  on public.lost_pet_reports for update
  to authenticated
  using ((select auth.uid()) = owner_id)
  with check (
    exists (
      select 1
      from public.pets
      where pets.id = lost_pet_reports.pet_id
        and pets.owner_id = (select auth.uid())
    )
  );

create policy "lost reports owner can delete"
  on public.lost_pet_reports for delete
  to authenticated
  using ((select auth.uid()) = owner_id);

create policy "pet photo objects owner can manage"
  on storage.objects for all
  to authenticated
  using (
    bucket_id = 'pet-photos'
    and owner_id = (select auth.uid())::text
  )
  with check (
    bucket_id = 'pet-photos'
    and owner_id = (select auth.uid())::text
  );

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
    pets.owner_whatsapp,
    pets.owner_phone,
    pets.emergency_name,
    pets.emergency_phone,
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
