import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { ActionIcon, Avatar, Burger, Group, Indicator, Kbd, Menu, Text, Tooltip, UnstyledButton, } from '@mantine/core';
import { IconBell, IconChevronDown, IconLogout, IconMoonStars, IconPlus, IconSearch, IconSettings, IconSun, IconUserCircle, } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from '@app/router/routes';
import { useAuthStore } from '@shared/store/authStore';
import { useNotificationStore } from '@shared/store/notificationStore';
import { useThemeStore } from '@shared/store/themeStore';
import { useUIStore } from '@shared/store/uiStore';
import { initials } from '@shared/lib/format';
import { NotificationDrawer } from '../../NotificationDrawer/ui/NotificationDrawer';
import { useState } from 'react';
export function Topbar({ onBurgerClick, mobileOpen }) {
    const user = useAuthStore((s) => s.user);
    const logout = useAuthStore((s) => s.logout);
    const setCommandPalette = useUIStore((s) => s.setCommandPalette);
    const colorScheme = useThemeStore((s) => s.colorScheme);
    const toggleScheme = useThemeStore((s) => s.toggleScheme);
    const unread = useNotificationStore((s) => s.unread);
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    return (_jsxs(Group, { h: "100%", px: { base: 'md', md: 'xl' }, justify: "space-between", wrap: "nowrap", children: [_jsxs(Group, { gap: "sm", wrap: "nowrap", children: [_jsx(Burger, { opened: mobileOpen, onClick: onBurgerClick, size: "sm", hiddenFrom: "md" }), _jsx(Tooltip, { label: _jsxs(Group, { gap: 6, children: ["Search ", _jsx(Kbd, { size: "xs", children: "\u2318 K" })] }), withArrow: true, children: _jsxs(UnstyledButton, { onClick: () => setCommandPalette(true), visibleFrom: "sm", style: {
                                display: 'flex',
                                alignItems: 'center',
                                gap: 8,
                                padding: '8px 12px',
                                borderRadius: 10,
                                border: '1px solid var(--app-border)',
                                background: 'var(--app-surface-2)',
                                minWidth: 280,
                                color: 'var(--app-text-muted)',
                            }, children: [_jsx(IconSearch, { size: 14 }), _jsx(Text, { size: "sm", c: "dimmed", children: "Search students, groups, leads\u2026" }), _jsxs(Group, { gap: 4, ml: "auto", children: [_jsx(Kbd, { size: "xs", children: "\u2318" }), _jsx(Kbd, { size: "xs", children: "K" })] })] }) })] }), _jsxs(Group, { gap: "xs", wrap: "nowrap", children: [_jsx(Tooltip, { label: "Quick add", withArrow: true, children: _jsx(ActionIcon, { variant: "gradient", gradient: { from: 'brand.5', to: 'accent.5', deg: 135 }, size: "lg", radius: "md", onClick: () => setCommandPalette(true), children: _jsx(IconPlus, { size: 18 }) }) }), _jsx(Tooltip, { label: colorScheme === 'dark' ? 'Light mode' : 'Dark mode', withArrow: true, children: _jsx(ActionIcon, { variant: "subtle", color: "gray", size: "lg", radius: "md", onClick: toggleScheme, children: colorScheme === 'dark' ? _jsx(IconSun, { size: 18 }) : _jsx(IconMoonStars, { size: 18 }) }) }), _jsx(Tooltip, { label: "Notifications", withArrow: true, children: _jsx(Indicator, { inline: true, size: 8, offset: 6, position: "top-end", color: "red", disabled: unread === 0, withBorder: true, children: _jsx(ActionIcon, { variant: "subtle", color: "gray", size: "lg", radius: "md", onClick: () => setDrawerOpen(true), children: _jsx(IconBell, { size: 18 }) }) }) }), _jsxs(Menu, { position: "bottom-end", shadow: "lg", radius: "md", width: 240, children: [_jsx(Menu.Target, { children: _jsxs(UnstyledButton, { style: {
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 8,
                                        padding: '4px 10px 4px 4px',
                                        borderRadius: 999,
                                        border: '1px solid var(--app-border)',
                                        background: 'var(--app-surface)',
                                    }, children: [_jsx(Avatar, { src: user?.avatarUrl, size: 28, radius: "xl", color: "brand", children: initials(user?.fullName ?? 'A') }), _jsx(Text, { size: "sm", fw: 600, visibleFrom: "sm", lineClamp: 1, children: user?.fullName ?? 'Account' }), _jsx(IconChevronDown, { size: 14 })] }) }), _jsxs(Menu.Dropdown, { children: [_jsx(Menu.Label, { children: user?.email }), _jsx(Menu.Item, { leftSection: _jsx(IconUserCircle, { size: 16 }), children: "Profile" }), _jsx(Menu.Item, { leftSection: _jsx(IconSettings, { size: 16 }), onClick: () => navigate(ROUTES.settings), children: "Settings" }), _jsx(Menu.Divider, {}), _jsx(Menu.Item, { color: "red", leftSection: _jsx(IconLogout, { size: 16 }), onClick: () => {
                                            logout();
                                            navigate(ROUTES.auth.login, { replace: true });
                                        }, children: "Sign out" })] })] })] }), _jsx(NotificationDrawer, { opened: drawerOpen, onClose: () => setDrawerOpen(false) })] }));
}
