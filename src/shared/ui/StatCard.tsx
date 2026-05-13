import { Box, Group, Stack, Text, ThemeIcon } from '@mantine/core';
import { IconArrowDownRight, IconArrowUpRight } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

import { SurfaceCard } from './SurfaceCard';

interface StatCardProps {
  label: string;
  value: ReactNode;
  delta?: number;
  hint?: string;
  icon?: ReactNode;
  accent?: 'brand' | 'accent' | 'success' | 'warning' | 'danger';
  loading?: boolean;
}

const accentBg: Record<NonNullable<StatCardProps['accent']>, string> = {
  brand: 'linear-gradient(135deg, rgba(99,102,241,.18), rgba(99,102,241,.04))',
  accent: 'linear-gradient(135deg, rgba(168,85,247,.18), rgba(168,85,247,.04))',
  success: 'linear-gradient(135deg, rgba(52,211,153,.18), rgba(52,211,153,.04))',
  warning: 'linear-gradient(135deg, rgba(255,172,26,.18), rgba(255,172,26,.04))',
  danger: 'linear-gradient(135deg, rgba(241,38,72,.18), rgba(241,38,72,.04))',
};

export function StatCard({
  label,
  value,
  delta,
  hint,
  icon,
  accent = 'brand',
  loading,
}: StatCardProps) {
  const positive = (delta ?? 0) >= 0;
  return (
    <SurfaceCard hover style={{ overflow: 'hidden', position: 'relative' }}>
      <Box
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          background: accentBg[accent],
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />
      <Stack gap="xs" style={{ position: 'relative' }}>
        <Group justify="space-between" align="flex-start">
          <Text size="xs" tt="uppercase" fw={600} c="dimmed" style={{ letterSpacing: 0.6 }}>
            {label}
          </Text>
          {icon && (
            <ThemeIcon
              variant="light"
              color={accent === 'danger' ? 'red' : accent === 'warning' ? 'yellow' : accent}
              size={36}
              radius="md"
            >
              {icon}
            </ThemeIcon>
          )}
        </Group>
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Text fz={28} fw={800} style={{ letterSpacing: '-0.02em' }}>
            {loading ? '—' : value}
          </Text>
        </motion.div>
        <Group gap={6} align="center">
          {typeof delta === 'number' && (
            <Group
              gap={4}
              align="center"
              c={positive ? 'teal.5' : 'red.5'}
              style={{ fontWeight: 600, fontSize: 12 }}
            >
              {positive ? (
                <IconArrowUpRight size={14} stroke={2.5} />
              ) : (
                <IconArrowDownRight size={14} stroke={2.5} />
              )}
              {Math.abs(delta)}%
            </Group>
          )}
          {hint && (
            <Text size="xs" c="dimmed">
              {hint}
            </Text>
          )}
        </Group>
      </Stack>
    </SurfaceCard>
  );
}
