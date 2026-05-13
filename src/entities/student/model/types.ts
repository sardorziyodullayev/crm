export type StudentStatus = 'active' | 'trial' | 'frozen' | 'archived';

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  email: string;
  phone: string;
  gender: 'male' | 'female';
  birthDate: string;
  avatarUrl?: string;
  parentName: string;
  parentPhone: string;
  branch: string;
  status: StudentStatus;
  groupIds: string[];
  tags: string[];
  notes: string;
  joinedAt: string;
  balanceUZS: number;
}

export interface StudentListQuery {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: StudentStatus | 'all';
  branch?: string;
  sortBy?: keyof Student;
  sortDir?: 'asc' | 'desc';
}
