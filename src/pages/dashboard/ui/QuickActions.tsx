import { Group, Stack, Text, ThemeIcon, UnstyledButton } from '@mantine/core';
import {
  IconBrandTelegram,
  IconCalendarPlus,
  IconCash,
  IconChevronRight,
  IconUserPlus,
  IconUsersGroup,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import { ROUTES } from '@app/router/routes';
import { SurfaceCard } from '@shared/ui/SurfaceCard';

const ACTIONS = [
  { label: 'Add a student', desc: 'Create a profile in seconds', icon: IconUserPlus, href: ROUTES.students + '?new=1', color: 'brand' },
  { label: 'New group', desc: 'Open a new cohort', icon: IconUsersGroup, href: ROUTES.groups + '?new=1', color: 'accent' },
  { label: 'Record payment', desc: 'Log a transaction', icon: IconCash, href: ROUTES.payments + '?new=1', color: 'success' },
  { label: 'Schedule event', desc: 'Add a calendar entry', icon: IconCalendarPlus, href: ROUTES.calendar, color: 'warning' },
  { label: 'Telegram bot', desc: 'Configure messaging', icon: IconBrandTelegram, href: ROUTES.settings, color: 'cyan' },
];

export function QuickActions() {
  const navigate = useNavigate();
  return (
    <SurfaceCard h="100%">
      <Stack gap="md">
        <Stack gap={2}>
          <Text fz={12} c="dimmed" tt="uppercase" fw={600} style={{ letterSpacing: 0.6 }}>
            Quick actions
          </Text>
          <Text fz={16} fw={700}>
            Save time with common tasks
          </Text>
        </Stack>
        <Stack gap={6}>
          {ACTIONS.map((a, i) => {
            const Icon = a.icon;
            return (
              <motion.div
                key={a.label}
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2, delay: i * 0.04 }}
              >
                <UnstyledButton
                  onClick={() => navigate(a.href)}
                  style={{
                    width: '100%',
                    padding: 12,
                    borderRadius: 12,
                    border: '1px solid var(--app-border)',
                    background: 'var(--app-surface-2)',
                    transition: 'transform 160ms ease, border-color 160ms ease',
                  }}
                >
                  <Group gap="sm" wrap="nowrap" justify="space-between">
                    <Group gap="sm" wrap="nowrap">
                      <ThemeIcon
                        variant="light"
                        radius="md"
                        size={36}
                        color={a.color === 'cyan' ? 'cyan' : a.color}
                      >
                        <Icon size={18} />
                      </ThemeIcon>
                      <Stack gap={0}>
                        <Text fz={14} fw={600}>
                          {a.label}
                        </Text>
                        <Text fz={12} c="dimmed">
                          {a.desc}
                        </Text>
                      </Stack>
                    </Group>
                    <IconChevronRight size={14} />
                  </Group>
                </UnstyledButton>
              </motion.div>
            );
          })}
        </Stack>
      </Stack>
    </SurfaceCard>
  );
}
