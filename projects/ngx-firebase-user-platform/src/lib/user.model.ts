import type { updateProfile } from 'firebase/auth';

export type AccountDetails = Parameters<typeof updateProfile>[1];
export type UserStatus =
  | 'online'
  | 'away'
  | 'offline'
  | 'unknown'
  | 'new-message'
  | undefined;
export type UidRecord = { email: string; uid: string };
export type UserData = {
  uid: string;
  email: string;
  status?: UserStatus;
  contacts?: string[];
} & AccountDetails;
