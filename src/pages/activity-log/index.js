import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, Badge, Group, Stack, Text, Timeline } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { mockActivity, queryKeys } from '@shared/api';
import { formatDateTime, fromNow, initials } from '@shared/lib/format';
import { PageHeader } from '@shared/ui/PageHeader';
import { SurfaceCard } from '@shared/ui/SurfaceCard';
const COLORS = {
    create: 'teal',
    update: 'blue',
    delete: 'red',
    login: 'grape',
    export: 'yellow',
};
export default function ActivityLogPage() {
    const query = useQuery({ queryKey: queryKeys.activity, queryFn: () => mockActivity.list() });
    return (_jsxs(Stack, { gap: "lg", children: [_jsx(PageHeader, { title: "Activity log", description: "Auditable history of every change in your workspace." }), _jsx(SurfaceCard, { children: _jsx(Timeline, { active: 3, bulletSize: 28, lineWidth: 2, children: (query.data ?? []).map((a) => (_jsx(Timeline.Item, { bullet: _jsx(Avatar, { size: 22, radius: "xl", color: COLORS[a.kind] ?? 'brand', variant: "light", children: initials(a.actor) }), title: _jsxs(Group, { gap: "xs", children: [_jsx(Text, { fz: 14, fw: 600, children: a.actor }), _jsx(Text, { fz: 13, c: "dimmed", children: a.action }), _jsx(Text, { fz: 14, fw: 600, children: a.target }), _jsx(Badge, { size: "xs", variant: "light", color: COLORS[a.kind] ?? 'gray', children: a.kind })] }), children: _jsxs(Text, { c: "dimmed", size: "sm", children: [fromNow(a.createdAt), " \u00B7 ", formatDateTime(a.createdAt)] }) }, a.id))) }) })] }));
}
