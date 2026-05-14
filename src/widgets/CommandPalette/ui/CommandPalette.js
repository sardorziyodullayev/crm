import { jsx as _jsx } from "react/jsx-runtime";
import { Spotlight, spotlight } from '@mantine/spotlight';
import { IconCalendar, IconCash, IconChartHistogram, IconChecklist, IconLayoutDashboard, IconReportAnalytics, IconSearch, IconSettings, IconUserCheck, IconUserPlus, IconUsers, IconUsersGroup, } from '@tabler/icons-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@app/router/routes';
import { useUIStore } from '@shared/store/uiStore';
export function CommandPalette() {
    const navigate = useNavigate();
    const open = useUIStore((s) => s.commandPaletteOpen);
    const setOpen = useUIStore((s) => s.setCommandPalette);
    useEffect(() => {
        const handler = (e) => {
            if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
                e.preventDefault();
                setOpen(true);
            }
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [setOpen]);
    useEffect(() => {
        if (open)
            spotlight.open();
        else
            spotlight.close();
    }, [open]);
    const go = (href) => () => {
        setOpen(false);
        navigate(href);
    };
    const actions = [
        {
            id: 'go-dashboard',
            label: 'Open Dashboard',
            description: 'Workspace overview',
            onClick: go(ROUTES.dashboard),
            leftSection: _jsx(IconLayoutDashboard, { size: 18 }),
            keywords: ['home', 'overview'],
        },
        {
            id: 'go-students',
            label: 'Students',
            description: 'View and manage all students',
            onClick: go(ROUTES.students),
            leftSection: _jsx(IconUsers, { size: 18 }),
        },
        {
            id: 'go-groups',
            label: 'Groups',
            description: 'Active and planned cohorts',
            onClick: go(ROUTES.groups),
            leftSection: _jsx(IconUsersGroup, { size: 18 }),
        },
        {
            id: 'go-leads',
            label: 'Leads · Sales funnel',
            description: 'Kanban funnel for prospects',
            onClick: go(ROUTES.leads),
            leftSection: _jsx(IconChartHistogram, { size: 18 }),
        },
        {
            id: 'go-payments',
            label: 'Payments',
            description: 'Track invoices and overdue',
            onClick: go(ROUTES.payments),
            leftSection: _jsx(IconCash, { size: 18 }),
        },
        {
            id: 'go-attendance',
            label: 'Attendance',
            description: 'Mark today\'s attendance',
            onClick: go(ROUTES.attendance),
            leftSection: _jsx(IconUserCheck, { size: 18 }),
        },
        {
            id: 'go-tasks',
            label: 'Tasks',
            description: 'Operational task board',
            onClick: go(ROUTES.tasks),
            leftSection: _jsx(IconChecklist, { size: 18 }),
        },
        {
            id: 'go-calendar',
            label: 'Calendar',
            description: 'Lessons & events',
            onClick: go(ROUTES.calendar),
            leftSection: _jsx(IconCalendar, { size: 18 }),
        },
        {
            id: 'go-reports',
            label: 'Reports',
            description: 'Financial and academic reports',
            onClick: go(ROUTES.reports),
            leftSection: _jsx(IconReportAnalytics, { size: 18 }),
        },
        {
            id: 'go-settings',
            label: 'Settings',
            description: 'Workspace, integrations, branding',
            onClick: go(ROUTES.settings),
            leftSection: _jsx(IconSettings, { size: 18 }),
        },
        {
            id: 'create-student',
            label: 'New student',
            description: 'Quickly add a student profile',
            onClick: go(ROUTES.students + '?new=1'),
            leftSection: _jsx(IconUserPlus, { size: 18 }),
            keywords: ['create', 'add'],
        },
        {
            id: 'create-lead',
            label: 'New lead',
            description: 'Capture an inbound lead',
            onClick: go(ROUTES.leads + '?new=1'),
            leftSection: _jsx(IconChartHistogram, { size: 18 }),
        },
    ];
    return (_jsx(Spotlight, { actions: actions, shortcut: ['mod + K'], nothingFound: "Nothing found here", highlightQuery: true, scrollable: true, maxHeight: 420, searchProps: {
            leftSection: _jsx(IconSearch, { size: 18 }),
            placeholder: 'Search workspace…',
        } }));
}
