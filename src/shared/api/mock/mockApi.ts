import dayjs from 'dayjs';

import {
  ACTIVITY,
  ATTENDANCE,
  GROUPS,
  LEADS,
  NOTIFICATIONS,
  PAYMENTS,
  STUDENTS,
  TASKS,
  TEACHERS,
  type SeedAttendance,
  type SeedGroup,
  type SeedLead,
  type SeedPayment,
  type SeedStudent,
  type SeedTask,
  type SeedTeacher,
} from './seed';

const delay = <T,>(value: T, ms = 200 + Math.random() * 250): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const cloneStudents = () => STUDENTS.map((s) => ({ ...s, tags: [...s.tags], groupIds: [...s.groupIds] }));
let studentsState: SeedStudent[] = cloneStudents();
let groupsState: SeedGroup[] = GROUPS.map((g) => ({ ...g, studentIds: [...g.studentIds] }));
let teachersState: SeedTeacher[] = TEACHERS.map((t) => ({ ...t, groupIds: [...t.groupIds] }));
let paymentsState: SeedPayment[] = PAYMENTS.map((p) => ({ ...p }));
let leadsState: SeedLead[] = LEADS.map((l) => ({ ...l }));
let tasksState: SeedTask[] = TASKS.map((t) => ({ ...t, tags: [...t.tags] }));
const attendanceState: SeedAttendance[] = ATTENDANCE.map((a) => ({
  ...a,
  records: a.records.map((r) => ({ ...r })),
}));

export interface ListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  sortBy?: string;
  sortDir?: 'asc' | 'desc';
  filters?: Record<string, string | string[] | boolean | undefined>;
}

export interface ListResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

const paginate = <T,>(items: T[], { page = 1, pageSize = 20 }: ListParams): ListResponse<T> => {
  const total = items.length;
  const start = (page - 1) * pageSize;
  return { data: items.slice(start, start + pageSize), total, page, pageSize };
};

const matchesSearch = (q: string | undefined, fields: string[]): boolean => {
  if (!q) return true;
  const needle = q.trim().toLowerCase();
  return fields.some((f) => f.toLowerCase().includes(needle));
};

const sortBy = <T,>(items: T[], key: string | undefined, dir: 'asc' | 'desc' = 'asc') => {
  if (!key) return items;
  return [...items].sort((a, b) => {
    const av = (a as Record<string, unknown>)[key];
    const bv = (b as Record<string, unknown>)[key];
    if (av === bv) return 0;
    const cmp = (av ?? '') > (bv ?? '') ? 1 : -1;
    return dir === 'asc' ? cmp : -cmp;
  });
};

/* ============ Auth ============ */
export const mockAuth = {
  login: async ({ email, password }: { email: string; password: string }) => {
    if (!email || !password) {
      throw Object.assign(new Error('Email and password are required'), { status: 400 });
    }
    return delay({
      token: 'mock.jwt.token.' + Date.now().toString(36),
      user: {
        id: 'usr_001',
        fullName: 'Aziza Karimova',
        email,
        phone: '+998 90 123 45 67',
        avatarUrl: '',
        role: 'owner' as const,
        branch: 'Tashkent · Yunusobod',
        createdAt: '2024-09-12T08:00:00Z',
      },
    });
  },
  register: async (payload: { fullName: string; email: string; password: string }) =>
    delay({ requiresOtp: true, otpChannel: payload.email }),
  verifyOtp: async ({ code }: { code: string }) => {
    if (code.length !== 6) {
      throw Object.assign(new Error('Invalid code'), { status: 400 });
    }
    return delay({ ok: true });
  },
  forgotPassword: async (_: { email: string }) => delay({ sent: true }),
};

/* ============ Students ============ */
export const mockStudents = {
  list: async (params: ListParams = {}): Promise<ListResponse<SeedStudent>> => {
    let items = studentsState;
    const status = params.filters?.status as string | undefined;
    if (status && status !== 'all') items = items.filter((s) => s.status === status);
    const branch = params.filters?.branch as string | undefined;
    if (branch) items = items.filter((s) => s.branch === branch);
    items = items.filter((s) =>
      matchesSearch(params.search, [s.fullName, s.phone, s.email, s.id]),
    );
    items = sortBy(items, params.sortBy, params.sortDir);
    return delay(paginate(items, params));
  },
  byId: async (id: string) => {
    const student = studentsState.find((s) => s.id === id);
    if (!student) throw Object.assign(new Error('Student not found'), { status: 404 });
    return delay(student);
  },
  create: async (payload: Partial<SeedStudent>): Promise<SeedStudent> => {
    const id = `std_${(studentsState.length + 1).toString().padStart(5, '0')}`;
    const newStudent: SeedStudent = {
      id,
      firstName: payload.firstName ?? 'New',
      lastName: payload.lastName ?? 'Student',
      fullName: `${payload.firstName ?? 'New'} ${payload.lastName ?? 'Student'}`,
      email: payload.email ?? '',
      phone: payload.phone ?? '',
      gender: payload.gender ?? 'male',
      birthDate: payload.birthDate ?? dayjs().subtract(18, 'year').format('YYYY-MM-DD'),
      parentName: payload.parentName ?? '',
      parentPhone: payload.parentPhone ?? '',
      branch: payload.branch ?? 'Tashkent · Yunusobod',
      status: payload.status ?? 'trial',
      groupIds: payload.groupIds ?? [],
      tags: payload.tags ?? [],
      notes: payload.notes ?? '',
      joinedAt: new Date().toISOString(),
      balanceUZS: 0,
    };
    studentsState = [newStudent, ...studentsState];
    return delay(newStudent);
  },
  update: async (id: string, patch: Partial<SeedStudent>) => {
    const idx = studentsState.findIndex((s) => s.id === id);
    if (idx < 0) throw Object.assign(new Error('Not found'), { status: 404 });
    const updated = { ...studentsState[idx]!, ...patch };
    updated.fullName = `${updated.firstName} ${updated.lastName}`;
    studentsState[idx] = updated;
    return delay(updated);
  },
  delete: async (ids: string[]) => {
    studentsState = studentsState.filter((s) => !ids.includes(s.id));
    return delay({ ok: true, deleted: ids.length });
  },
};

/* ============ Groups ============ */
export const mockGroups = {
  list: async (params: ListParams = {}): Promise<ListResponse<SeedGroup>> => {
    let items = groupsState;
    if (params.filters?.status && params.filters.status !== 'all') {
      items = items.filter((g) => g.status === params.filters!.status);
    }
    items = items.filter((g) =>
      matchesSearch(params.search, [g.name, g.course, g.branch, g.room]),
    );
    items = sortBy(items, params.sortBy, params.sortDir);
    return delay(paginate(items, { page: 1, pageSize: 100, ...params }));
  },
  byId: async (id: string) => {
    const g = groupsState.find((x) => x.id === id);
    if (!g) throw Object.assign(new Error('Not found'), { status: 404 });
    return delay(g);
  },
  create: async (payload: Partial<SeedGroup>) => {
    const id = `grp_${(groupsState.length + 1).toString().padStart(5, '0')}`;
    const newGroup: SeedGroup = {
      id,
      name: payload.name ?? 'New group',
      course: payload.course ?? 'General English',
      level: payload.level ?? 'A1',
      branch: payload.branch ?? 'Tashkent · Yunusobod',
      room: payload.room ?? 'Room 101',
      teacherId: payload.teacherId ?? teachersState[0]!.id,
      schedule: payload.schedule ?? { days: ['Mon', 'Wed', 'Fri'], time: '18:00 – 20:00' },
      startDate: payload.startDate ?? dayjs().format('YYYY-MM-DD'),
      endDate: payload.endDate ?? dayjs().add(90, 'day').format('YYYY-MM-DD'),
      studentIds: [],
      capacity: payload.capacity ?? 18,
      status: payload.status ?? 'planned',
      priceUZS: payload.priceUZS ?? 900_000,
    };
    groupsState = [newGroup, ...groupsState];
    return delay(newGroup);
  },
};

/* ============ Teachers ============ */
export const mockTeachers = {
  list: async (params: ListParams = {}): Promise<ListResponse<SeedTeacher>> => {
    let items = teachersState;
    items = items.filter((t) => matchesSearch(params.search, [t.fullName, t.email, t.specialty]));
    items = sortBy(items, params.sortBy, params.sortDir);
    return delay(paginate(items, { page: 1, pageSize: 50, ...params }));
  },
  byId: async (id: string) => {
    const t = teachersState.find((x) => x.id === id);
    if (!t) throw Object.assign(new Error('Not found'), { status: 404 });
    return delay(t);
  },
};

/* ============ Payments ============ */
export const mockPayments = {
  list: async (params: ListParams = {}): Promise<ListResponse<SeedPayment>> => {
    let items = paymentsState;
    const status = params.filters?.status as string | undefined;
    if (status && status !== 'all') items = items.filter((p) => p.status === status);
    const method = params.filters?.method as string | undefined;
    if (method) items = items.filter((p) => p.method === method);
    items = items.filter((p) => matchesSearch(params.search, [p.studentId, p.note ?? '']));
    items = sortBy(items, params.sortBy ?? 'dueAt', params.sortDir ?? 'desc');
    return delay(paginate(items, { page: 1, pageSize: 25, ...params }));
  },
  stats: async () => {
    const paid = paymentsState.filter((p) => p.status === 'paid');
    const overdue = paymentsState.filter((p) => p.status === 'overdue');
    const pending = paymentsState.filter((p) => p.status === 'pending');
    const refunded = paymentsState.filter((p) => p.status === 'refunded');
    const totalRevenue = paid.reduce((acc, p) => acc + p.amountUZS, 0);
    const totalOverdue = overdue.reduce((acc, p) => acc + p.amountUZS, 0);
    return delay({
      totalRevenue,
      totalOverdue,
      paidCount: paid.length,
      overdueCount: overdue.length,
      pendingCount: pending.length,
      refundedCount: refunded.length,
    });
  },
  create: async (payload: Partial<SeedPayment>) => {
    const id = `pay_${(paymentsState.length + 1).toString().padStart(5, '0')}`;
    const newPayment: SeedPayment = {
      id,
      studentId: payload.studentId ?? studentsState[0]!.id,
      groupId: payload.groupId ?? groupsState[0]!.id,
      amountUZS: payload.amountUZS ?? 900_000,
      method: payload.method ?? 'card',
      status: payload.status ?? 'paid',
      paidAt: payload.paidAt ?? new Date().toISOString(),
      dueAt: payload.dueAt ?? dayjs().format('YYYY-MM-DD'),
    };
    paymentsState = [newPayment, ...paymentsState];
    return delay(newPayment);
  },
};

/* ============ Leads ============ */
export const mockLeads = {
  list: async () => delay(leadsState),
  funnel: async () => {
    const funnel = (['new', 'contacted', 'trial', 'negotiation', 'won', 'lost'] as const).map((s) => ({
      stage: s,
      items: leadsState.filter((l) => l.status === s),
    }));
    return delay(funnel);
  },
  updateStatus: async (id: string, status: SeedLead['status']) => {
    leadsState = leadsState.map((l) => (l.id === id ? { ...l, status } : l));
    return delay({ ok: true });
  },
  create: async (payload: Partial<SeedLead>) => {
    const id = `lead_${(leadsState.length + 1).toString().padStart(5, '0')}`;
    const newLead: SeedLead = {
      id,
      fullName: payload.fullName ?? 'New lead',
      phone: payload.phone ?? '',
      source: payload.source ?? 'Website',
      status: 'new',
      interest: payload.interest ?? 'General English',
      assignedTo: payload.assignedTo ?? teachersState[0]!.id,
      createdAt: new Date().toISOString(),
      notes: '',
      estimatedValueUZS: payload.estimatedValueUZS ?? 900_000,
    };
    leadsState = [newLead, ...leadsState];
    return delay(newLead);
  },
};

/* ============ Attendance ============ */
export const mockAttendance = {
  byGroup: async (groupId: string) =>
    delay(attendanceState.filter((a) => a.groupId === groupId)),
  toggle: async (date: string, groupId: string, studentId: string, status: SeedAttendance['records'][number]['status']) => {
    const sheet = attendanceState.find((a) => a.date === date && a.groupId === groupId);
    if (!sheet) return delay({ ok: false });
    sheet.records = sheet.records.map((r) => (r.studentId === studentId ? { ...r, status } : r));
    return delay({ ok: true });
  },
};

/* ============ Tasks ============ */
export const mockTasks = {
  list: async () => delay(tasksState),
  updateStatus: async (id: string, status: SeedTask['status']) => {
    tasksState = tasksState.map((t) => (t.id === id ? { ...t, status } : t));
    return delay({ ok: true });
  },
  create: async (payload: Partial<SeedTask>) => {
    const id = `task_${(tasksState.length + 1).toString().padStart(5, '0')}`;
    const newTask: SeedTask = {
      id,
      title: payload.title ?? 'Untitled task',
      description: payload.description ?? '',
      assigneeId: payload.assigneeId ?? teachersState[0]!.id,
      dueDate: payload.dueDate ?? dayjs().add(7, 'day').format('YYYY-MM-DD'),
      priority: payload.priority ?? 'medium',
      status: 'todo',
      tags: payload.tags ?? [],
    };
    tasksState = [newTask, ...tasksState];
    return delay(newTask);
  },
};

/* ============ Notifications ============ */
export const mockNotifications = {
  list: async () => delay(NOTIFICATIONS),
};

/* ============ Activity ============ */
export const mockActivity = {
  list: async () => delay(ACTIVITY),
};

/* ============ Dashboard ============ */
export const mockDashboard = {
  summary: async () => {
    const activeStudents = studentsState.filter((s) => s.status === 'active').length;
    const trialStudents = studentsState.filter((s) => s.status === 'trial').length;
    const activeGroups = groupsState.filter((g) => g.status === 'active').length;
    const teachers = teachersState.filter((t) => t.status === 'active').length;
    const revenueThisMonth = paymentsState
      .filter((p) => p.status === 'paid' && dayjs(p.paidAt).isSame(dayjs(), 'month'))
      .reduce((s, p) => s + p.amountUZS, 0);
    const revenueLastMonth = paymentsState
      .filter(
        (p) =>
          p.status === 'paid' &&
          dayjs(p.paidAt).isSame(dayjs().subtract(1, 'month'), 'month'),
      )
      .reduce((s, p) => s + p.amountUZS, 0);
    const overdueAmount = paymentsState
      .filter((p) => p.status === 'overdue')
      .reduce((s, p) => s + p.amountUZS, 0);

    const newLeads = leadsState.filter((l) =>
      dayjs(l.createdAt).isAfter(dayjs().subtract(7, 'day')),
    ).length;

    return delay({
      activeStudents,
      trialStudents,
      activeGroups,
      teachers,
      revenueThisMonth,
      revenueLastMonth,
      revenueGrowth:
        revenueLastMonth === 0
          ? 0
          : Math.round(((revenueThisMonth - revenueLastMonth) / revenueLastMonth) * 100),
      overdueAmount,
      newLeads,
    });
  },
  revenueSeries: async () => {
    const series = Array.from({ length: 12 }).map((_, i) => {
      const month = dayjs().subtract(11 - i, 'month');
      const value = paymentsState
        .filter((p) => p.status === 'paid' && dayjs(p.paidAt).isSame(month, 'month'))
        .reduce((s, p) => s + p.amountUZS, 0);
      const expected = value + Math.round(value * 0.18);
      return {
        month: month.format('MMM'),
        revenue: value,
        target: expected,
      };
    });
    return delay(series);
  },
  growthSeries: async () => {
    const data = Array.from({ length: 12 }).map((_, i) => {
      const m = dayjs().subtract(11 - i, 'month');
      return {
        month: m.format('MMM'),
        students: 90 + i * 14 + Math.round(Math.random() * 10),
        leads: 30 + i * 4 + Math.round(Math.random() * 6),
      };
    });
    return delay(data);
  },
  sources: async () => {
    const counts: Record<string, number> = {};
    leadsState.forEach((l) => {
      counts[l.source] = (counts[l.source] ?? 0) + 1;
    });
    return delay(Object.entries(counts).map(([source, value]) => ({ source, value })));
  },
};
