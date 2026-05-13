import { Button, Center, Stack, Text, ThemeIcon, Title } from '@mantine/core';
import { IconInbox } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface EmptyStateProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: { label: string; onClick: () => void; icon?: ReactNode };
  height?: number | string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  height = 280,
}: EmptyStateProps) {
  return (
    <Center mih={height} py="xl">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Stack align="center" gap="md" maw={420} ta="center">
          <ThemeIcon size={64} radius="xl" variant="light" color="brand">
            {icon ?? <IconInbox size={28} />}
          </ThemeIcon>
          <Stack gap={4}>
            <Title order={4}>{title}</Title>
            {description && (
              <Text c="dimmed" size="sm">
                {description}
              </Text>
            )}
          </Stack>
          {action && (
            <Button
              onClick={action.onClick}
              leftSection={action.icon}
              variant="light"
              mt="xs"
            >
              {action.label}
            </Button>
          )}
        </Stack>
      </motion.div>
    </Center>
  );
}
