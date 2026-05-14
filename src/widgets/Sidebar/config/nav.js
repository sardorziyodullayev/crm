import { IconActivityHeartbeat, IconBell, IconCalendar, IconCash, IconChartHistogram, IconChecklist, IconLayoutDashboard, IconReportAnalytics, IconSettings, IconSparkles, IconUserCheck, IconUsers, IconUsersGroup, } from '@tabler/icons-react';
import { ROUTES } from '@app/router/routes';
export const NAV_ITEMS = [
    { id: 'dashboard', label: 'Dashboard', href: ROUTES.dashboard, icon: IconLayoutDashboard, group: 'workspace' },
    { id: 'students', label: 'Students', href: ROUTES.students, icon: IconUsers, group: 'crm' },
    { id: 'groups', label: 'Groups', href: ROUTES.groups, icon: IconUsersGroup, group: 'crm' },
    { id: 'teachers', label: 'Teachers', href: ROUTES.teachers, icon: IconSparkles, group: 'crm' },
    { id: 'leads', label: 'Leads', href: ROUTES.leads, icon: IconChartHistogram, badge: 'New', group: 'crm' },
    { id: 'attendance', label: 'Attendance', href: ROUTES.attendance, icon: IconUserCheck, group: 'operations' },
    { id: 'payments', label: 'Payments', href: ROUTES.payments, icon: IconCash, group: 'operations' },
    { id: 'tasks', label: 'Tasks', href: ROUTES.tasks, icon: IconChecklist, group: 'operations' },
    { id: 'calendar', label: 'Calendar', href: ROUTES.calendar, icon: IconCalendar, group: 'operations' },
    { id: 'reports', label: 'Reports', href: ROUTES.reports, icon: IconReportAnalytics, group: 'operations' },
    { id: 'notifications', label: 'Notifications', href: ROUTES.notifications, icon: IconBell, group: 'system' },
    { id: 'activity', label: 'Activity log', href: ROUTES.activityLog, icon: IconActivityHeartbeat, group: 'system' },
    { id: 'settings', label: 'Settings', href: ROUTES.settings, icon: IconSettings, group: 'system' },
];
export const NAV_GROUPS = [
    { id: 'workspace', label: 'Workspace' },
    { id: 'crm', label: 'CRM' },
    { id: 'operations', label: 'Operations' },
    { id: 'system', label: 'System' },
];
