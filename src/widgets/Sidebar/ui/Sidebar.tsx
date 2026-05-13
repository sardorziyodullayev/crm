import { ActionIcon, Badge, Box, Group, Stack, Text, Tooltip } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconChevronsLeft, IconChevronsRight, IconSearch } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { Fragment } from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import { useUIStore } from '@shared/store/uiStore';
import { BrandLogo } from '@shared/ui/BrandLogo';

import { NAV_GROUPS, NAV_ITEMS, type NavItem } from '../config/nav';

interface SidebarProps {
  onNavigate?: () => void;
}

function SidebarNavLink({
  item,
  collapsed,
  active,
  onNavigate,
}: {
  item: NavItem;
  collapsed: boolean;
  active: boolean;
  onNavigate?: () => void;
}) {
  const Icon = item.icon;

  const linkInner = (
    <Group
      gap="sm"
      align="center"
      wrap="nowrap"
      px={collapsed ? 0 : 12}
      py={9}
      justify={collapsed ? 'center' : 'flex-start'}
      style={{
        position: 'relative',
        borderRadius: 10,
        cursor: 'pointer',
        color: active ? 'var(--mantine-color-text)' : 'var(--app-text-muted)',
        background: active
          ? 'linear-gradient(180deg, rgba(99,102,241,.16), rgba(99,102,241,.06))'
          : 'transparent',
        transition: 'background 160ms ease, color 160ms ease',
      }}
    >
      {active && !collapsed && (
        <motion.div
          layoutId="sidebar-active-indicator"
          style={{
            position: 'absolute',
            left: -8,
            top: 8,
            bottom: 8,
            width: 3,
            borderRadius: 2,
            background: 'linear-gradient(180deg, #a78bfa, #60a5fa)',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 35 }}
        />
      )}
      <Icon size={18} stroke={1.8} />
      {!collapsed && (
        <Text fz={14} fw={active ? 600 : 500} style={{ flex: 1 }}>
          {item.label}
        </Text>
      )}
      {!collapsed && item.badge && (
        <Badge size="xs" variant="light" color="accent">
          {item.badge}
        </Badge>
      )}
    </Group>
  );

  return (
    <NavLink
      to={item.href}
      onClick={onNavigate}
      style={{ textDecoration: 'none', color: 'inherit' }}
    >
      {collapsed ? (
        <Tooltip label={item.label} position="right" withArrow openDelay={120}>
          {linkInner}
        </Tooltip>
      ) : (
        linkInner
      )}
    </NavLink>
  );
}

export function Sidebar({ onNavigate }: SidebarProps) {
  const collapsed = useUIStore((s) => s.sidebarCollapsed);
  const toggle = useUIStore((s) => s.toggleSidebar);
  const setCommandPalette = useUIStore((s) => s.setCommandPalette);
  const isMobile = useMediaQuery('(max-width: 62em)');
  const { pathname } = useLocation();
  const effectiveCollapsed = collapsed && !isMobile;

  return (
    <Stack gap={0} h="100%" justify="space-between" py="md" px={effectiveCollapsed ? 'xs' : 'md'}>
      <Stack gap="lg">
        <Group justify="space-between" wrap="nowrap" px={effectiveCollapsed ? 0 : 4}>
          <BrandLogo collapsed={effectiveCollapsed} />
          {!isMobile && (
            <Tooltip label={collapsed ? 'Expand' : 'Collapse'} position="right" withArrow>
              <ActionIcon onClick={toggle} variant="subtle" color="gray" size="sm">
                {collapsed ? <IconChevronsRight size={16} /> : <IconChevronsLeft size={16} />}
              </ActionIcon>
            </Tooltip>
          )}
        </Group>

        {!effectiveCollapsed && (
          <Group
            gap="xs"
            wrap="nowrap"
            px="sm"
            py={8}
            onClick={() => setCommandPalette(true)}
            style={{
              border: '1px solid var(--app-border)',
              borderRadius: 10,
              cursor: 'pointer',
              background: 'var(--app-surface-2)',
              transition: 'border-color 160ms ease',
            }}
          >
            <IconSearch size={14} />
            <Text size="xs" c="dimmed" style={{ flex: 1 }}>
              Search anything
            </Text>
            <Text fz={10} c="dimmed" style={{ fontFamily: 'JetBrains Mono, monospace' }}>
              ⌘K
            </Text>
          </Group>
        )}

        <Stack gap="lg">
          {NAV_GROUPS.map((group) => {
            const items = NAV_ITEMS.filter((i) => i.group === group.id);
            return (
              <Stack key={group.id} gap={4}>
                {!effectiveCollapsed && (
                  <Text
                    px="sm"
                    fz={10}
                    fw={700}
                    tt="uppercase"
                    c="dimmed"
                    style={{ letterSpacing: 0.8 }}
                  >
                    {group.label}
                  </Text>
                )}
                {items.map((item) => (
                  <Fragment key={item.id}>
                    <SidebarNavLink
                      item={item}
                      collapsed={effectiveCollapsed}
                      active={pathname.startsWith(item.href)}
                      onNavigate={onNavigate}
                    />
                  </Fragment>
                ))}
              </Stack>
            );
          })}
        </Stack>
      </Stack>

      {!effectiveCollapsed && (
        <Box
          mt="lg"
          p="md"
          style={{
            border: '1px solid var(--app-border)',
            borderRadius: 12,
            background:
              'linear-gradient(135deg, rgba(99,102,241,.18), rgba(168,85,247,.10))',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <Text fw={700} fz={13}>
            Upgrade to Pro
          </Text>
          <Text fz={12} c="dimmed" mt={2}>
            Unlock unlimited branches, Telegram bot and advanced analytics.
          </Text>
          <Box
            mt="xs"
            component="button"
            style={{
              all: 'unset',
              cursor: 'pointer',
              padding: '6px 10px',
              borderRadius: 8,
              background: 'linear-gradient(135deg, #7944ff, #4d62e6)',
              color: '#fff',
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            See plans
          </Box>
        </Box>
      )}
    </Stack>
  );
}
