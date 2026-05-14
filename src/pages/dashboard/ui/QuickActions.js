import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Group, Stack, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import { IconBrandTelegram, IconCalendarPlus, IconCash, IconChevronRight, IconUserPlus, IconUsersGroup, } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@app/router/routes';
import { SurfaceCard } from '@shared/ui/SurfaceCard';
const ACTIONS = [
    { label: 'Add a student', desc: 'Create a profile in seconds', icon: IconUserPlus, href: ROUTES.students + '?new=1', color: 'brand' },
    { label: 'New group', desc: 'Open a new cohort', icon: IconUsersGroup, href: ROUTES.groups + '?new=1', color: 'accent' },
    { label: 'Record payment', desc: 'Log a transaction', icon: IconCash, href: ROUTES.payments + '?new=1', color: 'success' },
    { label: 'Schedule event', desc: 'Add a calendar entry', icon: IconCalendarPlus, href: ROUTES.calendar, color: 'warning' },
    { label: 'Telegram bot', desc: 'Configure messaging', icon: IconBrandTelegram, href: ROUTES.settings, color: 'cyan' },
];
export function QuickActions() {
    const navigate = useNavigate();
    return (_jsx(SurfaceCard, { h: "100%", children: _jsxs(Stack, { gap: "md", children: [_jsxs(Stack, { gap: 2, children: [_jsx(Text, { fz: 12, c: "dimmed", tt: "uppercase", fw: 600, style: { letterSpacing: 0.6 }, children: "Quick actions" }), _jsx(Text, { fz: 16, fw: 700, children: "Save time with common tasks" })] }), _jsx(Stack, { gap: 6, children: ACTIONS.map((a, i) => {
                        const Icon = a.icon;
                        return (_jsx(motion.div, { initial: { opacity: 0, x: -6 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.2, delay: i * 0.04 }, children: _jsx(UnstyledButton, { onClick: () => navigate(a.href), style: {
                                    width: '100%',
                                    padding: 12,
                                    borderRadius: 12,
                                    border: '1px solid var(--app-border)',
                                    background: 'var(--app-surface-2)',
                                    transition: 'transform 160ms ease, border-color 160ms ease',
                                }, children: _jsxs(Group, { gap: "sm", wrap: "nowrap", justify: "space-between", children: [_jsxs(Group, { gap: "sm", wrap: "nowrap", children: [_jsx(ThemeIcon, { variant: "light", radius: "md", size: 36, color: a.color === 'cyan' ? 'cyan' : a.color, children: _jsx(Icon, { size: 18 }) }), _jsxs(Stack, { gap: 0, children: [_jsx(Text, { fz: 14, fw: 600, children: a.label }), _jsx(Text, { fz: 12, c: "dimmed", children: a.desc })] })] }), _jsx(IconChevronRight, { size: 14 })] }) }) }, a.label));
                    }) })] }) }));
}
