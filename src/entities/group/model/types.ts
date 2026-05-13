export type GroupStatus = 'active' | 'planned' | 'completed';

export interface Group {
  id: string;
  name: string;
  course: string;
  level: string;
  branch: string;
  room: string;
  teacherId: string;
  schedule: { days: string[]; time: string };
  startDate: string;
  endDate: string;
  studentIds: string[];
  capacity: number;
  status: GroupStatus;
  priceUZS: number;
}
