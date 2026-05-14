import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ActionIcon, Avatar, Badge, Box, Button, Group, Menu, ScrollArea, Stack, Text, } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconBrandFacebook, IconBrandInstagram, IconBrandTelegram, IconDots, IconPhone, IconPlus, IconUserPlus, IconWorld, } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { LEAD_STAGES, leadApi, } from '@entities/lead';
import { queryKeys } from '@shared/api';
import { formatUZS, fromNow, initials } from '@shared/lib/format';
import { PageHeader } from '@shared/ui/PageHeader';
import { SurfaceCard } from '@shared/ui/SurfaceCard';
const SOURCE_ICONS = {
    Instagram: _jsx(IconBrandInstagram, { size: 12 }),
    Telegram: _jsx(IconBrandTelegram, { size: 12 }),
    Facebook: _jsx(IconBrandFacebook, { size: 12 }),
    Website: _jsx(IconWorld, { size: 12 }),
    'Friend referral': _jsx(IconUserPlus, { size: 12 }),
    'Walk-in': _jsx(IconUserPlus, { size: 12 }),
};
export default function LeadsPage() {
    const qc = useQueryClient();
    const query = useQuery({
        queryKey: queryKeys.leads.funnel,
        queryFn: () => leadApi.funnel(),
    });
    const move = useMutation({
        mutationFn: ({ id, status }) => leadApi.updateStatus(id, status),
        onMutate: async ({ id, status }) => {
            await qc.cancelQueries({ queryKey: queryKeys.leads.funnel });
            const prev = qc.getQueryData(queryKeys.leads.funnel);
            qc.setQueryData(queryKeys.leads.funnel, (old) => {
                if (!old)
                    return old;
                let movedLead;
                const without = old.map((col) => ({
                    ...col,
                    items: col.items.filter((l) => {
                        if (l.id === id) {
                            movedLead = l;
                            return false;
                        }
                        return true;
                    }),
                }));
                if (!movedLead)
                    return old;
                const next = without.map((col) => col.stage === status ? { ...col, items: [{ ...movedLead, status }, ...col.items] } : col);
                return next;
            });
            return { prev };
        },
        onError: (_e, _v, ctx) => {
            if (ctx?.prev)
                qc.setQueryData(queryKeys.leads.funnel, ctx.prev);
        },
        onSuccess: (_d, v) => {
            notifications.show({
                title: 'Lead moved',
                message: `Status changed to ${v.status}`,
                color: 'brand',
            });
        },
    });
    return (_jsxs(Stack, { gap: "lg", h: "100%", children: [_jsx(PageHeader, { title: "Leads \u00B7 Sales funnel", description: "Manage prospects from first touch to enrollment.", actions: _jsx(Button, { leftSection: _jsx(IconPlus, { size: 14 }), size: "sm", variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, children: "New lead" }) }), _jsx(ScrollArea, { offsetScrollbars: true, scrollbarSize: 6, style: { width: '100%', flex: 1 }, children: _jsx(Group, { align: "flex-start", gap: "md", wrap: "nowrap", pb: "md", children: LEAD_STAGES.map((stage) => {
                        const column = query.data?.find((c) => c.stage === stage.id);
                        const items = column?.items ?? [];
                        const total = items.reduce((s, i) => s + i.estimatedValueUZS, 0);
                        return (_jsxs(Stack, { gap: "sm", w: 300, miw: 300, children: [_jsxs(Group, { justify: "space-between", px: "xs", children: [_jsxs(Group, { gap: 6, children: [_jsx(Box, { w: 8, h: 8, style: {
                                                        borderRadius: 999,
                                                        background: stage.accent === 'success'
                                                            ? '#34d399'
                                                            : stage.accent === 'danger'
                                                                ? '#f12648'
                                                                : stage.accent === 'warning'
                                                                    ? '#ffac1a'
                                                                    : stage.accent === 'cyan'
                                                                        ? '#22d3ee'
                                                                        : stage.accent === 'accent'
                                                                            ? '#a78bfa'
                                                                            : '#7944ff',
                                                    } }), _jsx(Text, { fw: 700, fz: 13, children: stage.label }), _jsx(Badge, { size: "xs", variant: "light", color: "gray", radius: "sm", children: items.length })] }), _jsx(Text, { fz: 11, c: "dimmed", children: formatUZS(total, { compact: true }) })] }), _jsx(Stack, { gap: "xs", p: "xs", style: {
                                        background: 'var(--app-surface-2)',
                                        border: '1px solid var(--app-border)',
                                        borderRadius: 14,
                                        minHeight: 200,
                                    }, children: items.length === 0 ? (_jsx(Box, { py: "md", ta: "center", children: _jsx(Text, { fz: 12, c: "dimmed", children: "No leads here" }) })) : (items.map((lead, i) => (_jsx(motion.div, { initial: { opacity: 0, y: 6 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.2, delay: i * 0.02 }, children: _jsx(LeadCard, { lead: lead, onMove: (status) => move.mutate({ id: lead.id, status }) }) }, lead.id)))) })] }, stage.id));
                    }) }) })] }));
}
function LeadCard({ lead, onMove }) {
    return (_jsx(SurfaceCard, { padding: "md", hover: true, children: _jsxs(Stack, { gap: "xs", children: [_jsxs(Group, { justify: "space-between", wrap: "nowrap", align: "flex-start", children: [_jsxs(Group, { gap: "sm", wrap: "nowrap", style: { minWidth: 0 }, children: [_jsx(Avatar, { size: 28, radius: "xl", color: "brand", variant: "light", children: initials(lead.fullName) }), _jsxs(Stack, { gap: 0, style: { minWidth: 0 }, children: [_jsx(Text, { fz: 13, fw: 600, lineClamp: 1, children: lead.fullName }), _jsx(Text, { fz: 11, c: "dimmed", children: lead.phone })] })] }), _jsxs(Menu, { position: "bottom-end", shadow: "md", children: [_jsx(Menu.Target, { children: _jsx(ActionIcon, { variant: "subtle", color: "gray", size: "sm", children: _jsx(IconDots, { size: 14 }) }) }), _jsxs(Menu.Dropdown, { children: [_jsx(Menu.Label, { children: "Move to" }), LEAD_STAGES.filter((s) => s.id !== lead.status).map((s) => (_jsx(Menu.Item, { onClick: () => onMove(s.id), children: s.label }, s.id))), _jsx(Menu.Divider, {}), _jsx(Menu.Item, { leftSection: _jsx(IconPhone, { size: 12 }), children: "Call" })] })] })] }), _jsxs(Text, { fz: 12, c: "dimmed", lineClamp: 1, children: ["Interested in ", _jsx("b", { children: lead.interest })] }), _jsxs(Group, { justify: "space-between", children: [_jsx(Badge, { variant: "light", color: "gray", radius: "sm", leftSection: SOURCE_ICONS[lead.source], children: lead.source }), _jsx(Text, { fz: 12, fw: 600, children: formatUZS(lead.estimatedValueUZS, { compact: true }) })] }), _jsx(Text, { fz: 10, c: "dimmed", children: fromNow(lead.createdAt) })] }) }));
}
