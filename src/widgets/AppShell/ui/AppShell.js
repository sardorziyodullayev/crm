import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { AppShell as MantineShell, Box, ScrollArea } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { Outlet } from 'react-router-dom';
import { useUIStore } from '@shared/store/uiStore';
import { PageTransition } from '@shared/ui/PageTransition';
import { CommandPalette } from '../../CommandPalette/ui/CommandPalette';
import { Topbar } from '../../Topbar/ui/Topbar';
import { Sidebar } from '../../Sidebar/ui/Sidebar';
export function AppShell() {
    const collapsed = useUIStore((s) => s.sidebarCollapsed);
    const isMobile = useMediaQuery('(max-width: 62em)');
    const [mobileOpen, { toggle: toggleMobile, close: closeMobile }] = useDisclosure(false);
    const sidebarWidth = collapsed && !isMobile ? 72 : 264;
    return (_jsxs(MantineShell, { header: { height: 64 }, navbar: {
            width: sidebarWidth,
            breakpoint: 'md',
            collapsed: { mobile: !mobileOpen },
        }, padding: 0, styles: {
            main: {
                background: 'var(--app-bg)',
                backgroundImage: 'var(--app-hero-gradient)',
                backgroundAttachment: 'fixed',
                minHeight: '100vh',
            },
            header: {
                background: 'var(--app-glass-bg)',
                backdropFilter: 'saturate(180%) blur(14px)',
                WebkitBackdropFilter: 'saturate(180%) blur(14px)',
                borderBottom: '1px solid var(--app-border)',
            },
            navbar: {
                background: 'var(--app-sidebar-bg)',
                borderRight: '1px solid var(--app-sidebar-border)',
            },
        }, children: [_jsx(MantineShell.Header, { children: _jsx(Topbar, { onBurgerClick: toggleMobile, mobileOpen: mobileOpen }) }), _jsx(MantineShell.Navbar, { p: 0, children: _jsx(ScrollArea, { style: { height: '100%' }, scrollbarSize: 6, children: _jsx(Sidebar, { onNavigate: closeMobile }) }) }), _jsx(MantineShell.Main, { children: _jsx(Box, { px: { base: 'md', md: 'xl' }, py: { base: 'md', md: 'xl' }, mx: "auto", style: { maxWidth: 'var(--app-content-max-width)' }, children: _jsx(PageTransition, { children: _jsx(Outlet, {}) }) }) }), _jsx(CommandPalette, {})] }));
}
