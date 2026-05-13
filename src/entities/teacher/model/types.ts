export type TeacherStatus = 'active' | 'on_leave' | 'inactive';

export interface Teacher {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  specialty: string;
  branch: string;
  status: TeacherStatus;
  monthlySalaryUZS: number;
  rating: number;
  joinedAt: string;
  groupIds: string[];
}
