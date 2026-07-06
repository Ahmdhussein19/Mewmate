export interface Cat {
  id: string;
  tagCode?: string;
  name: string;
  breed?: string;
  age?: string;
  color?: string;
  city?: string;
  personality?: string;
  ownerWhatsApp: string;
  ownerPhone?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  vetContact?: string;
  neighborhood?: string;
  homeAddress?: string;
  medicalNotes?: string;
  photos: string[];
  photoPaths?: string[];
  isLost: boolean;
  lost?: {
    since: number;
    reward?: string;
    lastSeen?: string;
    lastSeenWhen?: string;
    extraNote?: string;
    lastSeenAt?: number;
  };
  createdAt: number;
  updatedAt: number;
}

export interface OwnerProfile {
  displayName?: string;
  whatsapp?: string;
  phone?: string;
  emergencyName?: string;
  emergencyPhone?: string;
  neighborhood?: string;
  homeAddress?: string;
}
