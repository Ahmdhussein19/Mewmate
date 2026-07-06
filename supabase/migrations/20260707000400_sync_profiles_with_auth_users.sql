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
    coalesce(
      nullif(new.raw_user_meta_data ->> 'display_name', ''),
      nullif(new.raw_user_meta_data ->> 'full_name', ''),
      nullif(new.raw_user_meta_data ->> 'name', '')
    ),
    nullif(new.raw_user_meta_data ->> 'phone', ''),
    nullif(new.raw_user_meta_data ->> 'whatsapp', ''),
    nullif(new.raw_user_meta_data ->> 'avatar_url', '')
  )
  on conflict (id) do update
    set
      display_name = coalesce(public.profiles.display_name, excluded.display_name),
      phone = coalesce(public.profiles.phone, excluded.phone),
      whatsapp = coalesce(public.profiles.whatsapp, excluded.whatsapp),
      avatar_url = coalesce(public.profiles.avatar_url, excluded.avatar_url)
    where (
      public.profiles.display_name is null
      and excluded.display_name is not null
    ) or (
      public.profiles.phone is null
      and excluded.phone is not null
    ) or (
      public.profiles.whatsapp is null
      and excluded.whatsapp is not null
    ) or (
      public.profiles.avatar_url is null
      and excluded.avatar_url is not null
    );

  return new;
end;
$$;

drop trigger if exists auth_users_create_profile on auth.users;

create trigger auth_users_create_profile
  after insert on auth.users
  for each row execute function public.handle_new_user_profile();

insert into public.profiles (id, display_name, phone, whatsapp, avatar_url)
select
  auth_users.id,
  coalesce(
    nullif(auth_users.raw_user_meta_data ->> 'display_name', ''),
    nullif(auth_users.raw_user_meta_data ->> 'full_name', ''),
    nullif(auth_users.raw_user_meta_data ->> 'name', '')
  ),
  nullif(auth_users.raw_user_meta_data ->> 'phone', ''),
  nullif(auth_users.raw_user_meta_data ->> 'whatsapp', ''),
  nullif(auth_users.raw_user_meta_data ->> 'avatar_url', '')
from auth.users auth_users
left join public.profiles profiles
  on profiles.id = auth_users.id
where profiles.id is null;
