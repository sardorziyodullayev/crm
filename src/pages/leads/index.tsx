import {
  ActionIcon,
  Avatar,
  Badge,
  Box,
  Button,
  Group,
  Menu,
  ScrollArea,
  Stack,
  Text,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconBrandFacebook,
  IconBrandInstagram,
  IconBrandTelegram,
  IconDots,
  IconPhone,
  IconPlus,
  IconUserPlus,
  IconWorld,
} from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';

import {
  LEAD_STAGES,
  leadApi,
  type Lead,
  type LeadSource,
  type LeadStatus,
} from '@entities/lead';
import { queryKeys } from '@shared/api';
import { formatUZS, fromNow, initials } from '@shared/lib/format';
import { PageHeader } from '@shared/ui/PageHeader';
import { SurfaceCard } from '@shared/ui/SurfaceCard';

const SOURCE_ICONS: Record<LeadSource, React.ReactNode> = {
  Instagram: <IconBrandInstagram size={12} />,
  Telegram: <IconBrandTelegram size={12} />,
  Facebook: <IconBrandFacebook size={12} />,
  Website: <IconWorld size={12} />,
  'Friend referral': <IconUserPlus size={12} />,
  'Walk-in': <IconUserPlus size={12} />,
};

export default function LeadsPage() {
  const qc = useQueryClient();
  const query = useQuery({
    queryKey: queryKeys.leads.funnel,
    queryFn: () => leadApi.funnel(),
  });

  const move = useMutation({
    mutationFn: ({ id, status }: { id: string; status: LeadStatus }) =>
      leadApi.updateStatus(id, status),
    onMutate: async ({ id, status }) => {
      await qc.cancelQueries({ queryKey: queryKeys.leads.funnel });
      const prev = qc.getQueryData(queryKeys.leads.funnel);
      qc.setQueryData(queryKeys.leads.funnel, (old: typeof query.data) => {
        if (!old) return old;
        let movedLead: Lead | undefined;
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
        if (!movedLead) return old;
        const next = without.map((col) =>
          col.stage === status ? { ...col, items: [{ ...movedLead!, status }, ...col.items] } : col,
        );
        return next;
      });
      return { prev };
    },
    onError: (_e, _v, ctx) => {
      if (ctx?.prev) qc.setQueryData(queryKeys.leads.funnel, ctx.prev);
    },
    onSuccess: (_d, v) => {
      notifications.show({
        title: 'Lead moved',
        message: `Status changed to ${v.status}`,
        color: 'brand',
      });
    },
  });

  return (
    <Stack gap="lg" h="100%">
      <PageHeader
        title="Leads · Sales funnel"
        description="Manage prospects from first touch to enrollment."
        actions={
          <Button
            leftSection={<IconPlus size={14} />}
            size="sm"
            variant="gradient"
            gradient={{ from: 'brand.5', to: 'accent.5', deg: 135 }}
          >
            New lead
          </Button>
        }
      />

      <ScrollArea
        offsetScrollbars
        scrollbarSize={6}
        style={{ width: '100%', flex: 1 }}
      >
        <Group align="flex-start" gap="md" wrap="nowrap" pb="md">
          {LEAD_STAGES.map((stage) => {
            const column = query.data?.find((c) => c.stage === stage.id);
            const items = column?.items ?? [];
            const total = items.reduce((s, i) => s + i.estimatedValueUZS, 0);
            return (
              <Stack key={stage.id} gap="sm" w={300} miw={300}>
                <Group justify="space-between" px="xs">
                  <Group gap={6}>
                    <Box
                      w={8}
                      h={8}
                      style={{
                        borderRadius: 999,
                        background:
                          stage.accent === 'success'
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
                      }}
                    />
                    <Text fw={700} fz={13}>
                      {stage.label}
                    </Text>
                    <Badge size="xs" variant="light" color="gray" radius="sm">
                      {items.length}
                    </Badge>
                  </Group>
                  <Text fz={11} c="dimmed">
                    {formatUZS(total, { compact: true })}
                  </Text>
                </Group>
                <Stack
                  gap="xs"
                  p="xs"
                  style={{
                    background: 'var(--app-surface-2)',
                    border: '1px solid var(--app-border)',
                    borderRadius: 14,
                    minHeight: 200,
                  }}
                >
                  {items.length === 0 ? (
                    <Box py="md" ta="center">
                      <Text fz={12} c="dimmed">
                        No leads here
                      </Text>
                    </Box>
                  ) : (
                    items.map((lead, i) => (
                      <motion.div
                        key={lead.id}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2, delay: i * 0.02 }}
                      >
                        <LeadCard lead={lead} onMove={(status) => move.mutate({ id: lead.id, status })} />
                      </motion.div>
                    ))
                  )}
                </Stack>
              </Stack>
            );
          })}
        </Group>
      </ScrollArea>
    </Stack>
  );
}

function LeadCard({ lead, onMove }: { lead: Lead; onMove: (status: LeadStatus) => void }) {
  return (
    <SurfaceCard padding="md" hover>
      <Stack gap="xs">
        <Group justify="space-between" wrap="nowrap" align="flex-start">
          <Group gap="sm" wrap="nowrap" style={{ minWidth: 0 }}>
            <Avatar size={28} radius="xl" color="brand" variant="light">
              {initials(lead.fullName)}
            </Avatar>
            <Stack gap={0} style={{ minWidth: 0 }}>
              <Text fz={13} fw={600} lineClamp={1}>
                {lead.fullName}
              </Text>
              <Text fz={11} c="dimmed">
                {lead.phone}
              </Text>
            </Stack>
          </Group>
          <Menu position="bottom-end" shadow="md">
            <Menu.Target>
              <ActionIcon variant="subtle" color="gray" size="sm">
                <IconDots size={14} />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Label>Move to</Menu.Label>
              {LEAD_STAGES.filter((s) => s.id !== lead.status).map((s) => (
                <Menu.Item key={s.id} onClick={() => onMove(s.id)}>
                  {s.label}
                </Menu.Item>
              ))}
              <Menu.Divider />
              <Menu.Item leftSection={<IconPhone size={12} />}>Call</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
        <Text fz={12} c="dimmed" lineClamp={1}>
          Interested in <b>{lead.interest}</b>
        </Text>
        <Group justify="space-between">
          <Badge variant="light" color="gray" radius="sm" leftSection={SOURCE_ICONS[lead.source]}>
            {lead.source}
          </Badge>
          <Text fz={12} fw={600}>
            {formatUZS(lead.estimatedValueUZS, { compact: true })}
          </Text>
        </Group>
        <Text fz={10} c="dimmed">
          {fromNow(lead.createdAt)}
        </Text>
      </Stack>
    </SurfaceCard>
  );
}
