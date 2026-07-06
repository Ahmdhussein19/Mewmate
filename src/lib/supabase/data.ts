import { Cat, OwnerProfile } from '@/types/cat';
import { isSupabaseConfigured, supabase } from './client';

type PetRow = {
  id: string;
  tag_code: string;
  name: string;
  breed: string | null;
  age: string | null;
  color: string | null;
  city: string | null;
  personality: string | null;
  owner_whatsapp: string | null;
  owner_phone: string | null;
  emergency_name: string | null;
  emergency_phone: string | null;
  vet_contact: string | null;
  neighborhood: string | null;
  home_address: string | null;
  medical_notes: string | null;
  is_lost: boolean;
  created_at: string;
  updated_at: string;
};

type ProfileRow = {
  display_name: string | null;
  whatsapp: string | null;
  phone: string | null;
  emergency_name: string | null;
  emergency_phone: string | null;
  neighborhood: string | null;
  home_address: string | null;
};

type PhotoRow = {
  storage_path: string;
  display_order: number;
  is_primary: boolean;
};

type LostReportRow = {
  since: string;
  reward: string | null;
  last_seen: string | null;
  last_seen_when: string | null;
  extra_note: string | null;
  last_seen_at: string | null;
};

export type CatFormData = {
  name: string;
  breed?: string;
  age?: string;
  color?: string;
  city?: string;
  personality?: string;
  vetContact?: string;
  medicalNotes?: string;
};

const PLACEHOLDER_PHOTO = 'data:image/svg+xml;utf8,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120"><rect width="120" height="120" fill="#F2E3C6"/><text x="60" y="74" font-size="52" text-anchor="middle">🐱</text></svg>'
);

function assertConfigured() {
  if (!isSupabaseConfigured) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY');
  }
}

async function requireUserId() {
  assertConfigured();
  const { data, error } = await supabase.auth.getUser();
  if (error || !data.user) throw new Error('Please sign in to continue.');
  return data.user.id;
}

function ms(timestamp?: string | null) {
  return timestamp ? new Date(timestamp).getTime() : 0;
}

function clean(value?: string) {
  const trimmed = value?.trim();
  return trimmed || null;
}

function mapOwnerProfile(row?: ProfileRow | null): OwnerProfile {
  return {
    displayName: row?.display_name || undefined,
    whatsapp: row?.whatsapp || undefined,
    phone: row?.phone || undefined,
    emergencyName: row?.emergency_name || undefined,
    emergencyPhone: row?.emergency_phone || undefined,
    neighborhood: row?.neighborhood || undefined,
    homeAddress: row?.home_address || undefined,
  };
}

function toPetPayload(formData: CatFormData, ownerId?: string) {
  return {
    ...(ownerId ? { owner_id: ownerId } : {}),
    name: formData.name.trim(),
    breed: clean(formData.breed),
    age: clean(formData.age),
    color: clean(formData.color),
    city: clean(formData.city),
    personality: clean(formData.personality),
    vet_contact: clean(formData.vetContact),
    medical_notes: clean(formData.medicalNotes),
  };
}

export async function getOwnerProfile() {
  const ownerId = await requireUserId();
  const { data, error } = await supabase
    .from('profiles')
    .select('display_name, whatsapp, phone, emergency_name, emergency_phone, neighborhood, home_address')
    .eq('id', ownerId)
    .maybeSingle();

  if (error) throw error;
  return mapOwnerProfile(data as ProfileRow | null);
}

export async function saveOwnerProfile(profile: OwnerProfile) {
  const ownerId = await requireUserId();
  const { data, error } = await supabase
    .from('profiles')
    .upsert({
      id: ownerId,
      display_name: clean(profile.displayName),
      whatsapp: clean(profile.whatsapp),
      phone: clean(profile.phone),
      emergency_name: clean(profile.emergencyName),
      emergency_phone: clean(profile.emergencyPhone),
      neighborhood: clean(profile.neighborhood),
      home_address: clean(profile.homeAddress),
    })
    .select('display_name, whatsapp, phone, emergency_name, emergency_phone, neighborhood, home_address')
    .single();

  if (error) throw error;
  return mapOwnerProfile(data as ProfileRow);
}

export async function requireOwnerProfile() {
  const profile = await getOwnerProfile();
  if (!profile.whatsapp?.trim()) {
    throw new Error('Set up owner contact details before creating a pet profile.');
  }
  return profile;
}

async function signedPhotoUrl(path: string) {
  const { data, error } = await supabase.storage
    .from('pet-photos')
    .createSignedUrl(path, 60 * 60);

  if (error) return null;
  return data.signedUrl;
}

async function signedPhotoUrls(rows: PhotoRow[]) {
  const sorted = [...rows].sort((a, b) => {
    if (a.is_primary !== b.is_primary) return a.is_primary ? -1 : 1;
    return a.display_order - b.display_order;
  });

  const urls = await Promise.all(sorted.map(row => signedPhotoUrl(row.storage_path)));
  return {
    photos: urls.filter(Boolean) as string[],
    photoPaths: sorted.map(row => row.storage_path),
  };
}

async function signedPhotoPaths(paths: string[]) {
  const urls = await Promise.all(paths.map(path => signedPhotoUrl(path)));
  return urls.filter(Boolean) as string[];
}

async function rowsForPet(petId: string) {
  const [photosResult, lostResult] = await Promise.all([
    supabase
      .from('pet_photos')
      .select('storage_path, display_order, is_primary')
      .eq('pet_id', petId)
      .order('is_primary', { ascending: false })
      .order('display_order', { ascending: true }),
    supabase
      .from('lost_pet_reports')
      .select('since, reward, last_seen, last_seen_when, extra_note, last_seen_at')
      .eq('pet_id', petId)
      .eq('status', 'active')
      .order('since', { ascending: false })
      .limit(1),
  ]);

  if (photosResult.error) throw photosResult.error;
  if (lostResult.error) throw lostResult.error;

  return {
    photos: (photosResult.data || []) as PhotoRow[],
    lost: ((lostResult.data || [])[0] || null) as LostReportRow | null,
  };
}

async function mapPet(row: PetRow, ownerProfile?: OwnerProfile): Promise<Cat> {
  const related = await rowsForPet(row.id);
  const photoData = await signedPhotoUrls(related.photos);
  const owner = ownerProfile || {};

  return {
    id: row.id,
    tagCode: row.tag_code,
    name: row.name,
    breed: row.breed || undefined,
    age: row.age || undefined,
    color: row.color || undefined,
    city: row.city || undefined,
    personality: row.personality || undefined,
    ownerWhatsApp: owner.whatsapp || row.owner_whatsapp || '',
    ownerPhone: owner.phone || row.owner_phone || undefined,
    emergencyName: owner.emergencyName || row.emergency_name || undefined,
    emergencyPhone: owner.emergencyPhone || row.emergency_phone || undefined,
    vetContact: row.vet_contact || undefined,
    neighborhood: owner.neighborhood || row.neighborhood || undefined,
    homeAddress: owner.homeAddress || row.home_address || undefined,
    medicalNotes: row.medical_notes || undefined,
    photos: photoData.photos,
    photoPaths: photoData.photoPaths,
    isLost: row.is_lost,
    lost: related.lost
      ? {
          since: ms(related.lost.since),
          reward: related.lost.reward || undefined,
          lastSeen: related.lost.last_seen || undefined,
          lastSeenWhen: related.lost.last_seen_when || undefined,
          extraNote: related.lost.extra_note || undefined,
          lastSeenAt: ms(related.lost.last_seen_at),
        }
      : undefined,
    createdAt: ms(row.created_at),
    updatedAt: ms(row.updated_at),
  };
}

export async function listCats() {
  await requireUserId();
  const [ownerProfile, petsResult] = await Promise.all([
    getOwnerProfile(),
    supabase
      .from('pets')
      .select('*')
      .order('created_at', { ascending: false }),
  ]);

  if (petsResult.error) throw petsResult.error;
  return Promise.all(((petsResult.data || []) as PetRow[]).map(row => mapPet(row, ownerProfile)));
}

export async function getOwnedCat(id: string) {
  await requireUserId();
  const [ownerProfile, petResult] = await Promise.all([
    getOwnerProfile(),
    supabase
      .from('pets')
      .select('*')
      .eq('id', id)
      .maybeSingle(),
  ]);

  if (petResult.error) throw petResult.error;
  return petResult.data ? mapPet(petResult.data as PetRow, ownerProfile) : null;
}

function dataUrlToBlob(dataUrl: string) {
  const [header, body] = dataUrl.split(',');
  const mime = header.match(/data:(.*?);base64/)?.[1] || 'image/jpeg';
  const binary = atob(body);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return new Blob([bytes], { type: mime });
}

async function uploadPhoto(petId: string, ownerId: string, dataUrl: string, order: number) {
  const blob = dataUrlToBlob(dataUrl);
  const extension = blob.type === 'image/png' ? 'png' : blob.type === 'image/webp' ? 'webp' : 'jpg';
  const path = `${ownerId}/${petId}/${crypto.randomUUID()}.${extension}`;

  const { error: uploadError } = await supabase.storage
    .from('pet-photos')
    .upload(path, blob, { contentType: blob.type, upsert: false });

  if (uploadError) throw uploadError;

  const { error: insertError } = await supabase.from('pet_photos').insert({
    pet_id: petId,
    storage_path: path,
    display_order: order,
    is_primary: order === 0,
  });

  if (insertError) throw insertError;
  return path;
}

async function savePhotos(petId: string, photos: string[], existing?: Cat | null) {
  const ownerId = await requireUserId();
  const existingMap = new Map((existing?.photos || []).map((url, index) => [url, existing?.photoPaths?.[index]]));
  const keepPaths: string[] = [];
  const uploadItems: Array<{ dataUrl: string; order: number }> = [];

  photos.forEach((photo, order) => {
    const existingPath = existingMap.get(photo);
    if (existingPath) keepPaths.push(existingPath);
    if (photo.startsWith('data:')) uploadItems.push({ dataUrl: photo, order });
  });

  const oldPaths = existing?.photoPaths || [];
  const deletePaths = oldPaths.filter(path => !keepPaths.includes(path));
  if (deletePaths.length) {
    await supabase.storage.from('pet-photos').remove(deletePaths);
  }

  await supabase.from('pet_photos').delete().eq('pet_id', petId);

  for (const [order, photo] of photos.entries()) {
    const existingPath = existingMap.get(photo);
    if (existingPath) {
      const { error } = await supabase.from('pet_photos').insert({
        pet_id: petId,
        storage_path: existingPath,
        display_order: order,
        is_primary: order === 0,
      });
      if (error) throw error;
    }
  }

  for (const item of uploadItems) {
    await uploadPhoto(petId, ownerId, item.dataUrl, item.order);
  }
}

export async function createCat(formData: CatFormData, photos: string[]) {
  const ownerId = await requireUserId();
  const ownerProfile = await requireOwnerProfile();
  const { data, error } = await supabase
    .from('pets')
    .insert(toPetPayload(formData, ownerId))
    .select('*')
    .single();

  if (error) throw error;
  await savePhotos(data.id, photos, null);
  return mapPet(data as PetRow, ownerProfile);
}

export async function updateCat(id: string, formData: CatFormData, photos: string[], existing: Cat) {
  const ownerProfile = await getOwnerProfile();
  const { data, error } = await supabase
    .from('pets')
    .update(toPetPayload(formData))
    .eq('id', id)
    .select('*')
    .single();

  if (error) throw error;
  await savePhotos(id, photos, existing);
  return mapPet(data as PetRow, ownerProfile);
}

export async function deleteCat(id: string, existing?: Cat | null) {
  await requireUserId();
  if (existing?.photoPaths?.length) {
    await supabase.storage.from('pet-photos').remove(existing.photoPaths);
  }

  const { error } = await supabase.from('pets').delete().eq('id', id);
  if (error) throw error;
}

export async function startLostMode(cat: Cat) {
  await requireUserId();
  const { error } = await supabase.from('lost_pet_reports').insert({
    pet_id: cat.id,
    status: 'active',
    since: new Date().toISOString(),
    last_seen_at: new Date().toISOString(),
  });
  if (error) throw error;
}

export async function updateLostReport(cat: Cat, formData: {
  lastSeen?: string;
  lastSeenWhen?: string;
  reward?: string;
  extraNote?: string;
}) {
  await requireUserId();
  const { error } = await supabase
    .from('lost_pet_reports')
    .update({
      last_seen: clean(formData.lastSeen),
      last_seen_when: clean(formData.lastSeenWhen),
      reward: clean(formData.reward),
      extra_note: clean(formData.extraNote),
      last_seen_at: new Date().toISOString(),
    })
    .eq('pet_id', cat.id)
    .eq('status', 'active');

  if (error) throw error;
}

export async function markFound(catId: string) {
  await requireUserId();
  const { error } = await supabase
    .from('lost_pet_reports')
    .update({
      status: 'resolved',
      resolved_at: new Date().toISOString(),
    })
    .eq('pet_id', catId)
    .eq('status', 'active');

  if (error) throw error;
}

export async function getFinderCat(tagCode: string) {
  assertConfigured();
  const { data, error } = await supabase.rpc('get_finder_pet_profile', {
    lookup_tag_code: tagCode,
  });

  if (error) throw error;
  const row = Array.isArray(data) ? data[0] : null;
  if (!row) return null;
  const photoPaths = Array.isArray(row.photo_paths)
    ? row.photo_paths.filter(Boolean)
    : row.primary_photo_path
      ? [row.primary_photo_path]
      : [];
  const photos = await signedPhotoPaths(photoPaths);

  return {
    id: row.pet_id,
    tagCode: row.tag_code,
    name: row.name,
    breed: row.breed || undefined,
    age: row.age || undefined,
    color: row.color || undefined,
    city: row.city || undefined,
    personality: row.personality || undefined,
    ownerWhatsApp: row.owner_whatsapp,
    ownerPhone: row.owner_phone || undefined,
    emergencyName: row.emergency_name || undefined,
    emergencyPhone: row.emergency_phone || undefined,
    vetContact: row.vet_contact || undefined,
    photos,
    photoPaths,
    isLost: row.is_lost,
    lost: row.lost_since
      ? {
          since: ms(row.lost_since),
          reward: row.reward || undefined,
          lastSeen: row.last_seen || undefined,
          lastSeenWhen: row.last_seen_when || undefined,
          extraNote: row.extra_note || undefined,
          lastSeenAt: ms(row.last_seen_at),
        }
      : undefined,
    createdAt: 0,
    updatedAt: 0,
  } satisfies Cat;
}

export function finderURL(cat: Cat): string {
  const tagCode = cat.tagCode || cat.id;
  if (typeof window !== 'undefined') return `${window.location.origin}/cat/${tagCode}/finder`;
  return `/cat/${tagCode}/finder`;
}

export function placeholderPhoto() {
  return PLACEHOLDER_PHOTO;
}

export function normalizeEgyptPhone(phone: string): string {
  let n = String(phone || '').replace(/[^\d]/g, '');
  if (!n) return '';
  if (n.startsWith('00')) n = n.slice(2);
  if (n.startsWith('20')) return n;
  if (n.startsWith('0')) return '20' + n.slice(1);
  if (n.length === 10) return '20' + n;
  return n;
}

export function whatsappLink(phone: string): string {
  return `https://wa.me/${normalizeEgyptPhone(phone)}`;
}

export function telLink(phone: string): string {
  return `tel:+${normalizeEgyptPhone(phone)}`;
}

export function timeAgo(timestamp: number): string {
  if (!timestamp) return '';
  const seconds = Math.floor((Date.now() - timestamp) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function formatDate(timestamp: number): string {
  if (!timestamp) return '';
  return new Date(timestamp).toLocaleString('en-GB', {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
}
