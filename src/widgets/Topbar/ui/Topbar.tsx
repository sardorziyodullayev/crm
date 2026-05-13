import {
  ActionIcon,
  Avatar,
  Burger,
  Group,
  Indicator,
  Kbd,
  Menu,
  Text,
  Tooltip,
  UnstyledButton,
} from '@mantine/core';
import {
  IconBell,
  IconChevronDown,
  IconLogout,
  IconMoonStars,
  IconPlus,
  IconSearch,
  IconSettings,
  IconSun,
  IconUserCircle,
} from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@app/router/routes';
import { useAuthStore } from '@shared/store/authStore';
import { useNotificationStore } from '@shared/store/notificationStore';
import { useThemeStore } from '@shared/store/themeStore';
import { useUIStore } from '@shared/store/uiStore';
import { initials } from '@shared/lib/format';

import { NotificationDrawer } from '../../NotificationDrawer/ui/NotificationDrawer';
import { useState } from 'react';

interface TopbarProps {
  onBurgerClick: () => void;
  mobileOpen: boolean;
}

export function Topbar({ onBurgerClick, mobileOpen }: TopbarProps) {
  const user = useAuthStore((s) => s.user);
  const logout = useAuthStore((s) => s.logout);
  const setCommandPalette = useUIStore((s) => s.setCommandPalette);
  const colorScheme = useThemeStore((s) => s.colorScheme);
  const toggleScheme = useThemeStore((s) => s.toggleScheme);
  const unread = useNotificationStore((s) => s.unread);
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <Group h="100%" px={{ base: 'md', md: 'xl' }} justify="space-between" wrap="nowrap">
      <Group gap="sm" wrap="nowrap">
        <Burger opened={mobileOpen} onClick={onBurgerClick} size="sm" hiddenFrom="md" />
        <Tooltip label={<Group gap={6}>Search <Kbd size="xs">⌘ K</Kbd></Group>} withArrow>
          <UnstyledButton
            onClick={() => setCommandPalette(true)}
            visibleFrom="sm"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '8px 12px',
              borderRadius: 10,
              border: '1px solid var(--app-border)',
              background: 'var(--app-surface-2)',
              minWidth: 280,
              color: 'var(--app-text-muted)',
            }}
          >
            <IconSearch size={14} />
            <Text size="sm" c="dimmed">
              Search students, groups, leads…
            </Text>
            <Group gap={4} ml="auto">
              <Kbd size="xs">⌘</Kbd>
              <Kbd size="xs">K</Kbd>
            </Group>
          </UnstyledButton>
        </Tooltip>
      </Group>

      <Group gap="xs" wrap="nowrap">
        <Tooltip label="Quick add" withArrow>
          <ActionIcon
            variant="gradient"
            gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}
            size="lg"
            radius="md"
            onClick={() => setCommandPalette(true)}
          >
            <IconPlus size={18} />
          </ActionIcon>
        </Tooltip>

        <Tooltip label={colorScheme === 'dark' ? 'Light mode' : 'Dark mode'} withArrow>
          <ActionIcon
            variant="subtle"
            color="gray"
            size="lg"
            radius="md"
            onClick={toggleScheme}
          >
            {colorScheme === 'dark' ? <IconSun size={18} /> : <IconMoonStars size={18} />}
          </ActionIcon>
        </Tooltip>

        <Tooltip label="Notifications" withArrow>
          <Indicator
            inline
            size={8}
            offset={6}
            position="top-end"
            color="red"
            disabled={unread === 0}
            withBorder
          >
            <ActionIcon
              variant="subtle"
              color="gray"
              size="lg"
              radius="md"
              onClick={() => setDrawerOpen(true)}
            >
              <IconBell size={18} />
            </ActionIcon>
          </Indicator>
        </Tooltip>

        <Menu position="bottom-end" shadow="lg" radius="md" width={240}>
          <Menu.Target>
            <UnstyledButton
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 8,
                padding: '4px 10px 4px 4px',
                borderRadius: 999,
                border: '1px solid var(--app-border)',
                background: 'var(--app-surface)',
              }}
            >
              <Avatar src={user?.avatarUrl} size={28} radius="xl" color="brand">
                {initials(user?.fullName ?? 'A')}
              </Avatar>
              <Text size="sm" fw={600} visibleFrom="sm" lineClamp={1}>
                {user?.fullName ?? 'Account'}
              </Text>
              <IconChevronDown size={14} />
            </UnstyledButton>
          </Menu.Target>
          <Menu.Dropdown>
            <Menu.Label>{user?.email}</Menu.Label>
            <Menu.Item leftSection={<IconUserCircle size={16} />}>Profile</Menu.Item>
            <Menu.Item
              leftSection={<IconSettings size={16} />}
              onClick={() => navigate(ROUTES.settings)}
            >
              Settings
            </Menu.Item>
            <Menu.Divider />
            <Menu.Item
              color="red"
              leftSection={<IconLogout size={16} />}
              onClick={() => {
                logout();
                navigate(ROUTES.auth.login, { replace: true });
              }}
            >
              Sign out
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <NotificationDrawer opened={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </Group>
  );
}
