import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ActionIcon, Badge, Box, Group, Stack, Text, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronsLeft, IconChevronsRight, IconSearch } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { Fragment } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useUIStore } from '@shared/store/uiStore';
import { BrandLogo } from '@shared/ui/BrandLogo';
import { NAV_GROUPS, NAV_ITEMS } from '../config/nav';
function SidebarNavLink({ item, collapsed, active, onNavigate, }) {
    const Icon = item.icon;
    const linkInner = (_jsxs(Group, { gap: "sm", align: "center", wrap: "nowrap", px: collapsed ? 0 : 12, py: 9, justify: collapsed ? 'center' : 'flex-start', style: {
            position: 'relative',
            borderRadius: 10,
            cursor: 'pointer',
            color: active ? 'var(--mantine-color-text)' : 'var(--app-text-muted)',
            background: active
                ? 'linear-gradient(180deg, rgba(99,102,241,.16), rgba(99,102,241,.06))'
                : 'transparent',
            transition: 'background 160ms ease, color 160ms ease',
        }, children: [active && !collapsed && (_jsx(motion.div, { layoutId: "sidebar-active-indicator", style: {
                    position: 'absolute',
                    left: -8,
                    top: 8,
                    bottom: 8,
                    width: 3,
                    borderRadius: 2,
                    background: 'linear-gradient(180deg, #a78bfa, #60a5fa)',
                }, transition: { type: 'spring', stiffness: 500, damping: 35 } })), _jsx(Icon, { size: 18, stroke: 1.8 }), !collapsed && (_jsx(Text, { fz: 14, fw: active ? 600 : 500, style: { flex: 1 }, children: item.label })), !collapsed && item.badge && (_jsx(Badge, { size: "xs", variant: "light", color: "accent", children: item.badge }))] }));
    return (_jsx(NavLink, { to: item.href, onClick: onNavigate, style: { textDecoration: 'none', color: 'inherit' }, children: collapsed ? (_jsx(Tooltip, { label: item.label, position: "right", withArrow: true, openDelay: 120, children: linkInner })) : (linkInner) }));
}
export function Sidebar({ onNavigate }) {
    const collapsed = useUIStore((s) => s.sidebarCollapsed);
    const toggle = useUIStore((s) => s.toggleSidebar);
    const setCommandPalette = useUIStore((s) => s.setCommandPalette);
    const isMobile = useMediaQuery('(max-width: 62em)');
    const { pathname } = useLocation();
    const effectiveCollapsed = collapsed && !isMobile;
    return (_jsxs(Stack, { gap: 0, h: "100%", justify: "space-between", py: "md", px: effectiveCollapsed ? 'xs' : 'md', children: [_jsxs(Stack, { gap: "lg", children: [_jsxs(Group, { justify: "space-between", wrap: "nowrap", px: effectiveCollapsed ? 0 : 4, children: [_jsx(BrandLogo, { collapsed: effectiveCollapsed }), !isMobile && (_jsx(Tooltip, { label: collapsed ? 'Expand' : 'Collapse', position: "right", withArrow: true, children: _jsx(ActionIcon, { onClick: toggle, variant: "subtle", color: "gray", size: "sm", children: collapsed ? _jsx(IconChevronsRight, { size: 16 }) : _jsx(IconChevronsLeft, { size: 16 }) }) }))] }), !effectiveCollapsed && (_jsxs(Group, { gap: "xs", wrap: "nowrap", px: "sm", py: 8, onClick: () => setCommandPalette(true), style: {
                            border: '1px solid var(--app-border)',
                            borderRadius: 10,
                            cursor: 'pointer',
                            background: 'var(--app-surface-2)',
                            transition: 'border-color 160ms ease',
                        }, children: [_jsx(IconSearch, { size: 14 }), _jsx(Text, { size: "xs", c: "dimmed", style: { flex: 1 }, children: "Search anything" }), _jsx(Text, { fz: 10, c: "dimmed", style: { fontFamily: 'JetBrains Mono, monospace' }, children: "\u2318K" })] })), _jsx(Stack, { gap: "lg", children: NAV_GROUPS.map((group) => {
                            const items = NAV_ITEMS.filter((i) => i.group === group.id);
                            return (_jsxs(Stack, { gap: 4, children: [!effectiveCollapsed && (_jsx(Text, { px: "sm", fz: 10, fw: 700, tt: "uppercase", c: "dimmed", style: { letterSpacing: 0.8 }, children: group.label })), items.map((item) => (_jsx(Fragment, { children: _jsx(SidebarNavLink, { item: item, collapsed: effectiveCollapsed, active: pathname.startsWith(item.href), onNavigate: onNavigate }) }, item.id)))] }, group.id));
                        }) })] }), !effectiveCollapsed && (_jsxs(Box, { mt: "lg", p: "md", style: {
                    border: '1px solid var(--app-border)',
                    borderRadius: 12,
                    background: 'linear-gradient(135deg, rgba(99,102,241,.18), rgba(168,85,247,.10))',
                    position: 'relative',
                    overflow: 'hidden',
                }, children: [_jsx(Text, { fw: 700, fz: 13, children: "Upgrade to Pro" }), _jsx(Text, { fz: 12, c: "dimmed", mt: 2, children: "Unlock unlimited branches, Telegram bot and advanced analytics." }), _jsx(Box, { mt: "xs", component: "button", style: {
                            all: 'unset',
                            cursor: 'pointer',
                            padding: '6px 10px',
                            borderRadius: 8,
                            background: 'linear-gradient(135deg, #7944ff, #4d62e6)',
                            color: '#fff',
                            fontSize: 12,
                            fontWeight: 600,
                        }, children: "See plans" })] }))] }));
}
