import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ActionIcon, Badge, Box, Button, Group, Menu, ScrollArea, Stack, Text, } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCalendar, IconDots, IconPlus } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { motion } from 'framer-motion';
import { mockTasks, queryKeys } from '@shared/api';
import { PageHeader } from '@shared/ui/PageHeader';
import { StatusBadge } from '@shared/ui/StatusBadge';
import { SurfaceCard } from '@shared/ui/SurfaceCard';
const COLUMNS = [
    { id: 'todo', label: 'To do' },
    { id: 'in_progress', label: 'In progress' },
    { id: 'review', label: 'Review' },
    { id: 'done', label: 'Done' },
];
export default function TasksPage() {
    const qc = useQueryClient();
    const query = useQuery({ queryKey: queryKeys.tasks.all, queryFn: () => mockTasks.list() });
    const move = useMutation({
        mutationFn: ({ id, status }) => mockTasks.updateStatus(id, status),
        onMutate: async ({ id, status }) => {
            await qc.cancelQueries({ queryKey: queryKeys.tasks.all });
            const prev = qc.getQueryData(queryKeys.tasks.all);
            qc.setQueryData(queryKeys.tasks.all, (old) => (old ?? []).map((t) => (t.id === id ? { ...t, status } : t)));
            return { prev };
        },
        onError: (_e, _v, ctx) => ctx?.prev && qc.setQueryData(queryKeys.tasks.all, ctx.prev),
        onSuccess: () => notifications.show({ title: 'Task updated', message: 'Status changed', color: 'brand' }),
    });
    return (_jsxs(Stack, { gap: "lg", h: "100%", children: [_jsx(PageHeader, { title: "Tasks", description: "Operational task board for your team.", actions: _jsx(Button, { leftSection: _jsx(IconPlus, { size: 14 }), size: "sm", variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, children: "New task" }) }), _jsx(ScrollArea, { offsetScrollbars: true, scrollbarSize: 6, children: _jsx(Group, { align: "flex-start", gap: "md", wrap: "nowrap", pb: "md", children: COLUMNS.map((col) => {
                        const items = (query.data ?? []).filter((t) => t.status === col.id);
                        return (_jsxs(Stack, { gap: "sm", w: 300, miw: 300, children: [_jsxs(Group, { justify: "space-between", px: "xs", children: [_jsx(Text, { fw: 700, fz: 13, children: col.label }), _jsx(Badge, { size: "xs", variant: "light", radius: "sm", children: items.length })] }), _jsx(Stack, { gap: "xs", p: "xs", style: {
                                        background: 'var(--app-surface-2)',
                                        border: '1px solid var(--app-border)',
                                        borderRadius: 14,
                                        minHeight: 200,
                                    }, children: items.length === 0 ? (_jsx(Box, { py: "md", ta: "center", children: _jsx(Text, { fz: 12, c: "dimmed", children: "Drop tasks here" }) })) : (items.map((t, i) => (_jsx(motion.div, { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.18, delay: i * 0.02 }, children: _jsx(SurfaceCard, { padding: "md", hover: true, children: _jsxs(Stack, { gap: "xs", children: [_jsxs(Group, { justify: "space-between", align: "flex-start", children: [_jsxs(Stack, { gap: 2, style: { minWidth: 0 }, children: [_jsx(Text, { fz: 13, fw: 700, lineClamp: 2, children: t.title }), _jsx(Text, { fz: 11, c: "dimmed", lineClamp: 2, children: t.description })] }), _jsxs(Menu, { position: "bottom-end", children: [_jsx(Menu.Target, { children: _jsx(ActionIcon, { variant: "subtle", size: "sm", color: "gray", children: _jsx(IconDots, { size: 14 }) }) }), _jsxs(Menu.Dropdown, { children: [_jsx(Menu.Label, { children: "Move to" }), COLUMNS.filter((c) => c.id !== t.status).map((c) => (_jsx(Menu.Item, { onClick: () => move.mutate({ id: t.id, status: c.id }), children: c.label }, c.id)))] })] })] }), _jsxs(Group, { gap: 6, children: [_jsx(StatusBadge, { status: t.priority }), t.tags.map((tag) => (_jsx(Badge, { variant: "light", radius: "sm", color: "gray", children: tag }, tag)))] }), _jsxs(Group, { gap: 6, c: "dimmed", fz: 11, children: [_jsx(IconCalendar, { size: 12 }), dayjs(t.dueDate).format('MMM D')] })] }) }) }, t.id)))) })] }, col.id));
                    }) }) })] }));
}
