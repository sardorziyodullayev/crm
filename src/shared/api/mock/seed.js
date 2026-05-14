/**
 * Deterministic seed data generator using realistic Uzbek names, courses, payments
 * and attendance. All amounts are in UZS (Uzbek soum).
 */
import dayjs from 'dayjs';
const FIRST_NAMES_M = [
    'Akmal', 'Aziz', 'Bobur', 'Doniyor', 'Elyor', 'Farhod', 'Jasur', 'Javohir',
    'Kamron', 'Murod', 'Nodir', 'Otabek', 'Rustam', 'Shavkat', 'Sherzod', 'Sirojiddin',
    'Timur', 'Ulug\'bek', 'Bekzod', 'Sardor', 'Sanjar', 'Asilbek',
];
const FIRST_NAMES_F = [
    'Aziza', 'Dilnoza', 'Feruza', 'Gulnoza', 'Iroda', 'Kamola', 'Laylo',
    'Madina', 'Malika', 'Mavluda', 'Nargiza', 'Nodira', 'Sevinch', 'Shahnoza',
    'Sitora', 'Umida', 'Zarina', 'Zilola', 'Zukhra', 'Mokhinur', 'Marjona',
];
const LAST_NAMES = [
    'Karimov', 'Karimova', 'Rahimov', 'Rahimova', 'Yusupov', 'Yusupova',
    'Saidov', 'Saidova', 'Nazarov', 'Nazarova', 'Tursunov', 'Tursunova',
    'Mirzaev', 'Mirzaeva', 'Ergashev', 'Ergasheva', 'Toshmatov', 'Toshmatova',
    'Qodirov', 'Qodirova', 'Sultonov', 'Sultonova', 'Hamidov', 'Hamidova',
    'Nematov', 'Nematova', 'Iskandarov', 'Iskandarova',
];
const COURSES = [
    { name: 'IELTS Intensive', level: 'B2', priceUZS: 1_400_000 },
    { name: 'General English', level: 'A2', priceUZS: 700_000 },
    { name: 'Spoken English', level: 'B1', priceUZS: 900_000 },
    { name: 'Frontend Development', level: 'Beginner', priceUZS: 1_800_000 },
    { name: 'Python Backend', level: 'Intermediate', priceUZS: 1_900_000 },
    { name: 'Data Analytics', level: 'Intermediate', priceUZS: 1_750_000 },
    { name: 'Graphic Design', level: 'Beginner', priceUZS: 1_200_000 },
    { name: 'SAT Prep', level: 'Advanced', priceUZS: 2_200_000 },
    { name: 'Math Olympiad', level: 'Advanced', priceUZS: 1_100_000 },
    { name: 'Korean Language', level: 'A1', priceUZS: 800_000 },
];
const BRANCHES = [
    'Tashkent · Yunusobod', 'Tashkent · Chilonzor', 'Tashkent · Mirzo Ulug\'bek',
    'Samarqand · Markaz', 'Buxoro · Markaz',
];
const ROOMS = ['Room 101', 'Room 102', 'Room 201', 'Room 202', 'Room 301', 'Lab A', 'Lab B'];
const LEAD_SOURCES = ['Instagram', 'Telegram', 'Friend referral', 'Website', 'Walk-in', 'Facebook'];
const LEAD_STATUSES = ['new', 'contacted', 'trial', 'negotiation', 'won', 'lost'];
const PAYMENT_METHODS = ['cash', 'card', 'click', 'payme', 'transfer'];
const STUDENT_STATUSES = ['active', 'trial', 'frozen', 'archived'];
const TEACHER_STATUSES = ['active', 'on_leave', 'inactive'];
/* ------ deterministic RNG ------ */
let seed = 0xC0FFEE;
const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
};
const resetRandom = (s = 0xC0FFEE) => {
    seed = s;
};
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const between = (min, max) => Math.floor(rand() * (max - min + 1)) + min;
const id = (prefix, n) => `${prefix}_${n.toString().padStart(5, '0')}`;
const buildName = () => {
    const isMale = rand() > 0.5;
    const first = isMale ? pick(FIRST_NAMES_M) : pick(FIRST_NAMES_F);
    const last = pick(LAST_NAMES);
    const gender = isMale ? 'male' : 'female';
    return { firstName: first, lastName: last, gender };
};
const phone = () => `+998 ${[90, 91, 93, 94, 97, 99, 88, 33][between(0, 7)]} ${between(100, 999)} ${between(10, 99)} ${between(10, 99)}`;
const email = (first, last) => `${first.toLowerCase().replace(/[^a-z]/g, '')}.${last.toLowerCase().replace(/[^a-z]/g, '')}@gmail.com`;
const STUDENT_TAGS = ['VIP', 'Promising', 'Discounted', 'Olympiad', 'Scholarship', 'New'];
const TEACHER_SPECIALTIES = [
    'English (IELTS, TOEFL)', 'Frontend (React/TS)', 'Backend (Python)',
    'UI/UX & Graphic Design', 'Data Analytics', 'Mathematics',
    'Korean Language', 'SAT / SAT Math',
];
resetRandom();
/* ------ Build teachers ------ */
export const TEACHERS = Array.from({ length: 14 }).map((_, i) => {
    const { firstName, lastName } = buildName();
    const fullName = `${firstName} ${lastName}`;
    return {
        id: id('tch', i + 1),
        fullName,
        email: email(firstName, lastName),
        phone: phone(),
        specialty: pick(TEACHER_SPECIALTIES),
        branch: pick(BRANCHES),
        status: rand() > 0.85 ? 'on_leave' : 'active',
        monthlySalaryUZS: between(6_000_000, 18_000_000),
        rating: Number((4 + rand()).toFixed(1)),
        joinedAt: dayjs()
            .subtract(between(60, 1200), 'day')
            .toISOString(),
        groupIds: [],
    };
});
/* ------ Build groups ------ */
export const GROUPS = Array.from({ length: 22 }).map((_, i) => {
    const course = pick(COURSES);
    const teacher = pick(TEACHERS);
    const cohort = Math.floor(i / 4) + 1;
    const days = rand() > 0.5 ? ['Mon', 'Wed', 'Fri'] : rand() > 0.5 ? ['Tue', 'Thu', 'Sat'] : ['Mon', 'Tue', 'Wed', 'Thu'];
    const startHour = [9, 11, 14, 16, 18][between(0, 4)];
    const g = {
        id: id('grp', i + 1),
        name: `${course.name} · G-${cohort}${String.fromCharCode(65 + (i % 4))}`,
        course: course.name,
        level: course.level,
        branch: teacher.branch,
        room: pick(ROOMS),
        teacherId: teacher.id,
        schedule: { days, time: `${startHour}:00 – ${startHour + 2}:00` },
        startDate: dayjs().subtract(between(10, 240), 'day').format('YYYY-MM-DD'),
        endDate: dayjs().add(between(20, 200), 'day').format('YYYY-MM-DD'),
        studentIds: [],
        capacity: between(12, 22),
        status: rand() > 0.9 ? 'completed' : rand() > 0.15 ? 'active' : 'planned',
        priceUZS: course.priceUZS,
    };
    teacher.groupIds.push(g.id);
    return g;
});
/* ------ Build students ------ */
export const STUDENTS = Array.from({ length: 240 }).map((_, i) => {
    const { firstName, lastName, gender } = buildName();
    const fullName = `${firstName} ${lastName}`;
    const numGroups = between(1, 2);
    const assignedGroups = [];
    for (let g = 0; g < numGroups; g++) {
        const group = GROUPS[between(0, GROUPS.length - 1)];
        if (group.studentIds.length < group.capacity && !assignedGroups.includes(group.id)) {
            group.studentIds.push(id('std', i + 1));
            assignedGroups.push(group.id);
        }
    }
    const tags = [];
    if (rand() > 0.85)
        tags.push('VIP');
    if (rand() > 0.9)
        tags.push('Olympiad');
    if (rand() > 0.93)
        tags.push('Scholarship');
    if (rand() > 0.7)
        tags.push(pick(STUDENT_TAGS));
    const status = rand() > 0.92 ? 'frozen' : rand() > 0.85 ? 'trial' : rand() > 0.97 ? 'archived' : 'active';
    return {
        id: id('std', i + 1),
        firstName,
        lastName,
        fullName,
        email: email(firstName, lastName),
        phone: phone(),
        gender,
        birthDate: dayjs()
            .subtract(between(14, 35), 'year')
            .subtract(between(0, 360), 'day')
            .format('YYYY-MM-DD'),
        parentName: `${pick(FIRST_NAMES_M)} ${lastName}`,
        parentPhone: phone(),
        branch: pick(BRANCHES),
        status,
        groupIds: assignedGroups,
        tags,
        notes: '',
        joinedAt: dayjs()
            .subtract(between(1, 900), 'day')
            .toISOString(),
        balanceUZS: rand() > 0.7 ? -between(100_000, 900_000) : between(0, 1_400_000),
    };
});
/* ------ Build payments ------ */
export const PAYMENTS = [];
let paymentCounter = 1;
for (const student of STUDENTS) {
    const months = between(2, 9);
    for (let m = months; m >= 0; m--) {
        const due = dayjs().subtract(m, 'month').date(5);
        const groupId = student.groupIds[0] ?? GROUPS[0].id;
        const group = GROUPS.find((g) => g.id === groupId);
        const rNum = rand();
        const status = rNum > 0.92 ? 'overdue' : rNum > 0.86 ? 'pending' : rNum > 0.02 ? 'paid' : 'refunded';
        const paidAt = status === 'paid'
            ? due.add(between(-3, 3), 'day').toISOString()
            : status === 'refunded'
                ? due.add(between(2, 8), 'day').toISOString()
                : '';
        PAYMENTS.push({
            id: id('pay', paymentCounter++),
            studentId: student.id,
            groupId,
            amountUZS: group.priceUZS,
            method: pick(PAYMENT_METHODS),
            status,
            paidAt,
            dueAt: due.format('YYYY-MM-DD'),
            note: status === 'overdue' ? 'Pending follow-up' : '',
        });
    }
}
/* ------ Build leads ------ */
const LEAD_INTERESTS = COURSES.map((c) => c.name);
export const LEADS = Array.from({ length: 64 }).map((_, i) => {
    const { firstName, lastName } = buildName();
    const fullName = `${firstName} ${lastName}`;
    return {
        id: id('lead', i + 1),
        fullName,
        phone: phone(),
        source: pick(LEAD_SOURCES),
        status: pick(LEAD_STATUSES),
        interest: pick(LEAD_INTERESTS),
        assignedTo: TEACHERS[between(0, TEACHERS.length - 1)].id,
        createdAt: dayjs().subtract(between(0, 60), 'day').toISOString(),
        notes: '',
        estimatedValueUZS: pick(COURSES).priceUZS,
    };
});
/* ------ Build attendance (last 30 days, per group) ------ */
export const ATTENDANCE = [];
const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
for (const group of GROUPS.slice(0, 12)) {
    for (let d = 0; d < 30; d++) {
        const date = dayjs().subtract(d, 'day');
        const day = days[date.day()];
        if (!group.schedule.days.includes(day))
            continue;
        ATTENDANCE.push({
            date: date.format('YYYY-MM-DD'),
            groupId: group.id,
            records: group.studentIds.map((sid) => {
                const r = rand();
                const status = r > 0.92 ? 'absent' : r > 0.88 ? 'late' : r > 0.86 ? 'excused' : 'present';
                return { studentId: sid, status };
            }),
        });
    }
}
/* ------ Build tasks ------ */
const TASK_TITLES = [
    'Call parents of overdue students',
    'Prepare monthly attendance report',
    'Plan open day at Yunusobod branch',
    'Onboard new IELTS group',
    'Review teacher performance metrics',
    'Send invoices for September',
    'Coordinate exam scheduling',
    'Negotiate corporate course with Uzum',
    'Audit cash payments — Q3',
    'Renew teacher contracts',
];
export const TASKS = TASK_TITLES.map((title, i) => ({
    id: id('task', i + 1),
    title,
    description: 'Auto-generated task. Provides realistic scope for ops team.',
    assigneeId: TEACHERS[i % TEACHERS.length].id,
    dueDate: dayjs().add(between(-3, 14), 'day').format('YYYY-MM-DD'),
    priority: ['low', 'medium', 'high', 'urgent'][between(0, 3)],
    status: ['todo', 'in_progress', 'review', 'done'][between(0, 3)],
    tags: ['ops', i % 2 === 0 ? 'finance' : 'academic'],
}));
/* ------ Build activity ------ */
const ACTIVITY_ACTIONS = [
    'created a student',
    'updated a payment',
    'closed a lead',
    'logged in',
    'exported a report',
    'archived a group',
    'invited a new manager',
];
export const ACTIVITY = Array.from({ length: 40 }).map((_, i) => ({
    id: id('act', i + 1),
    actor: TEACHERS[between(0, TEACHERS.length - 1)].fullName,
    action: pick(ACTIVITY_ACTIONS),
    target: rand() > 0.5
        ? STUDENTS[between(0, STUDENTS.length - 1)].fullName
        : GROUPS[between(0, GROUPS.length - 1)].name,
    createdAt: dayjs().subtract(between(0, 14), 'day').subtract(between(0, 23), 'hour').toISOString(),
    kind: ['create', 'update', 'delete', 'login', 'export'][between(0, 4)],
}));
/* ------ Notifications seed ------ */
export const NOTIFICATIONS = [
    {
        id: 'ntf_1',
        kind: 'payment',
        title: 'New payment received',
        description: `${PAYMENTS.find((p) => p.status === 'paid').amountUZS.toLocaleString('uz-UZ')} UZS · Payme`,
        createdAt: dayjs().subtract(8, 'minute').toISOString(),
        read: false,
        href: '/payments',
    },
    {
        id: 'ntf_2',
        kind: 'lead',
        title: 'New lead from Instagram',
        description: 'Sevinch Mirzaeva — interested in IELTS Intensive',
        createdAt: dayjs().subtract(35, 'minute').toISOString(),
        read: false,
        href: '/leads',
    },
    {
        id: 'ntf_3',
        kind: 'attendance',
        title: 'Low attendance alert',
        description: `Frontend Development · G-1A — 3 absences in a row`,
        createdAt: dayjs().subtract(2, 'hour').toISOString(),
        read: false,
        href: '/attendance',
    },
    {
        id: 'ntf_4',
        kind: 'system',
        title: 'Monthly report ready',
        description: 'September financial overview is available',
        createdAt: dayjs().subtract(1, 'day').toISOString(),
        read: true,
        href: '/reports',
    },
    {
        id: 'ntf_5',
        kind: 'mention',
        title: 'You were mentioned',
        description: 'Akmal Karimov tagged you on Task #18',
        createdAt: dayjs().subtract(2, 'day').toISOString(),
        read: true,
        href: '/tasks',
    },
];
