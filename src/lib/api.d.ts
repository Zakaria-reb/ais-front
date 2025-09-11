export interface UserProfile {
  fullName: string;
  username: string;
  yearOfStudy?: string;
  email?: string;
  phone?: string;
  projectsParticipated?: any[];
  eventsAttended?: any[];
  achievements?: any[];
}

export function getCurrentUser(): Promise<UserProfile>;
export function login(arg1: any, arg2?: any): Promise<any>;
export function logout(): Promise<any>;
