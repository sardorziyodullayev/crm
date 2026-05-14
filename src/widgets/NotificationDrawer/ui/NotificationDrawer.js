import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ActionIcon, Badge, Box, Button, Drawer, Group, ScrollArea, Stack, Text, ThemeIcon, } from '@mantine/core';
import { IconBell, IconCash, IconCheck, IconExternalLink, IconSpeakerphone, IconUserCheck, IconUserPlus, } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockNotifications, queryKeys } from '@shared/api';
import { useNotificationStore, } from '@shared/store/notificationStore';
import { fromNow } from '@shared/lib/format';
import { EmptyState } from '@shared/ui/EmptyState';
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
export function NotificationDrawer({ opened, onClose }) {
    const setItems = useNotificationStore((s) => s.setItems);
    const items = useNotificationStore((s) => s.items);
    const markRead = useNotificationStore((s) => s.markRead);
    const markAllRead = useNotificationStore((s) => s.markAllRead);
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: queryKeys.notifications,
        queryFn: () => mockNotifications.list(),
    });
    useEffect(() => {
        if (data)
            setItems(data);
    }, [data, setItems]);
    return (_jsxs(Drawer, { opened: opened, onClose: onClose, position: "right", size: 440, withCloseButton: false, padding: 0, styles: {
            content: { background: 'var(--app-bg-elevated)' },
        }, children: [_jsxs(Group, { justify: "space-between", px: "lg", py: "md", style: { borderBottom: '1px solid var(--app-border)' }, children: [_jsxs(Group, { gap: "xs", children: [_jsx(Text, { fw: 700, fz: 16, children: "Notifications" }), _jsxs(Badge, { variant: "light", color: "brand", children: [items.filter((i) => !i.read).length, " new"] })] }), _jsx(Button, { size: "xs", variant: "subtle", onClick: markAllRead, children: "Mark all read" })] }), _jsx(ScrollArea, { h: "calc(100vh - 64px)", scrollbarSize: 6, children: isLoading ? (_jsx(Stack, { p: "lg", gap: "sm", children: Array.from({ length: 5 }).map((_, i) => (_jsx(Box, { h: 70, style: {
                            background: 'var(--app-surface-2)',
                            borderRadius: 12,
                            opacity: 0.6,
                        } }, i))) })) : items.length === 0 ? (_jsx(EmptyState, { title: "You're all caught up", description: "No new notifications" })) : (_jsxs(Stack, { p: "lg", gap: "xs", children: [items.map((n, i) => (_jsx(motion.div, { initial: { opacity: 0, x: 12 }, animate: { opacity: 1, x: 0 }, transition: { duration: 0.2, delay: i * 0.04 }, children: _jsxs(Group, { align: "flex-start", gap: "sm", wrap: "nowrap", p: "md", style: {
                                    border: '1px solid var(--app-border)',
                                    background: n.read ? 'transparent' : 'var(--app-surface-2)',
                                    borderRadius: 12,
                                    cursor: 'pointer',
                                }, onClick: () => {
                                    markRead(n.id);
                                    if (n.href)
                                        navigate(n.href);
                                    onClose();
                                }, children: [_jsx(ThemeIcon, { color: COLORS[n.kind], variant: "light", radius: "md", size: 36, children: ICONS[n.kind] }), _jsxs(Box, { style: { flex: 1, minWidth: 0 }, children: [_jsxs(Group, { justify: "space-between", gap: "xs", wrap: "nowrap", children: [_jsx(Text, { fw: 600, fz: 14, lineClamp: 1, children: n.title }), !n.read && (_jsx(Box, { style: {
                                                            width: 8,
                                                            height: 8,
                                                            borderRadius: 999,
                                                            background: 'var(--mantine-color-brand-5)',
                                                            flex: '0 0 auto',
                                                        } }))] }), _jsx(Text, { fz: 13, c: "dimmed", lineClamp: 2, children: n.description }), _jsxs(Group, { justify: "space-between", mt: 4, children: [_jsx(Text, { fz: 11, c: "dimmed", children: fromNow(n.createdAt) }), n.href && (_jsx(ActionIcon, { size: "xs", variant: "subtle", color: "gray", children: _jsx(IconExternalLink, { size: 12 }) }))] })] })] }) }, n.id))), _jsxs(Group, { justify: "center", py: "md", children: [_jsx(ThemeIcon, { variant: "light", color: "success", size: 28, radius: "xl", children: _jsx(IconCheck, { size: 14 }) }), _jsx(Text, { size: "xs", c: "dimmed", children: "Synced just now" })] })] })) })] }));
}
