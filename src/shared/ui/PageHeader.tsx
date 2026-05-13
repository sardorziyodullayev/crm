import { Box, Group, Stack, Text, Title } from '@mantine/core';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  badge?: ReactNode;
  actions?: ReactNode;
  breadcrumbs?: ReactNode;
}

export function PageHeader({ title, description, badge, actions, breadcrumbs }: PageHeaderProps) {
  return (
    <Box mb="lg">
      {breadcrumbs && <Box mb="xs">{breadcrumbs}</Box>}
      <Group justify="space-between" align="flex-end" wrap="nowrap" gap="md">
        <Stack gap={6} style={{ minWidth: 0 }}>
          <Group gap="xs" align="center" wrap="nowrap">
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
            >
              <Title order={2} style={{ letterSpacing: '-0.02em' }}>
                {title}
              </Title>
            </motion.div>
            {badge}
          </Group>
          {description && (
            <Text c="dimmed" size="sm" style={{ maxWidth: 720 }}>
              {description}
            </Text>
          )}
        </Stack>
        {actions && (
          <Group gap="xs" wrap="nowrap">
            {actions}
          </Group>
        )}
      </Group>
    </Box>
  );
}
