import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Badge, Box, Button, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconBell, IconCash, IconChecks, IconSpeakerphone, IconUserCheck, IconUserPlus, } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { mockNotifications, queryKeys } from '@shared/api';
import { fromNow } from '@shared/lib/format';
import { useNotificationStore, } from '@shared/store/notificationStore';
import { EmptyState } from '@shared/ui/EmptyState';
import { PageHeader } from '@shared/ui/PageHeader';
import { SurfaceCard } from '@shared/ui/SurfaceCard';
const ICONS = {
    payment: _jsx(IconCash, { size: 16 }),
    lead: _jsx(IconUserPlus, { size: 16 }),
    attendance: _jsx(IconUserCheck, { size: 16 }),
    system: _jsx(IconSpeakerphone, { size: 16 }),
    mention: _jsx(IconBell, { size: 16 }),
};
const COLORS = {
    payment: 'success',
    lead: 'brand',
    attendance: 'warning',
    system: 'gray',
    mention: 'accent',
};
export default function NotificationsPage() {
    const setItems = useNotificationStore((s) => s.setItems);
    const items = useNotificationStore((s) => s.items);
    const markAllRead = useNotificationStore((s) => s.markAllRead);
    const { data, isLoading } = useQuery({
        queryKey: queryKeys.notifications,
        queryFn: () => mockNotifications.list(),
    });
    useEffect(() => {
        if (data)
            setItems(data);
    }, [data, setItems]);
    return (_jsxs(Stack, { gap: "lg", children: [_jsx(PageHeader, { title: "Notifications", description: "System events and updates from your workspace.", actions: _jsx(Button, { leftSection: _jsx(IconChecks, { size: 14 }), variant: "light", size: "sm", onClick: markAllRead, children: "Mark all as read" }) }), isLoading ? (_jsx(Stack, { gap: "sm", children: Array.from({ length: 6 }).map((_, i) => (_jsx(Box, { h: 80, style: { background: 'var(--app-surface-2)', borderRadius: 12, opacity: 0.6 } }, i))) })) : items.length === 0 ? (_jsx(EmptyState, { title: "You're all caught up", description: "No new notifications" })) : (_jsx(Stack, { gap: "sm", children: items.map((n, i) => (_jsx(motion.div, { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.2, delay: i * 0.04 }, children: _jsx(SurfaceCard, { padding: "lg", style: { background: n.read ? undefined : 'var(--app-surface-2)' }, children: _jsx(Group, { justify: "space-between", wrap: "nowrap", align: "flex-start", children: _jsxs(Group, { gap: "md", wrap: "nowrap", align: "flex-start", children: [_jsx(ThemeIcon, { variant: "light", radius: "md", size: 40, color: COLORS[n.kind], children: ICONS[n.kind] }), _jsxs(Stack, { gap: 4, children: [_jsxs(Group, { gap: 6, children: [_jsx(Text, { fw: 700, fz: 14, children: n.title }), !n.read && _jsx(Badge, { variant: "dot", color: "brand", size: "xs", children: "New" })] }), _jsx(Text, { fz: 13, c: "dimmed", children: n.description }), _jsx(Text, { fz: 11, c: "dimmed", children: fromNow(n.createdAt) })] })] }) }) }) }, n.id))) }))] }));
}
