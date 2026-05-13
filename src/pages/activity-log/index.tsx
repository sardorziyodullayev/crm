import { Avatar, Badge, Group, Stack, Text, Timeline } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';

import { mockActivity, queryKeys } from '@shared/api';
import { formatDateTime, fromNow, initials } from '@shared/lib/format';
import { PageHeader } from '@shared/ui/PageHeader';
import { SurfaceCard } from '@shared/ui/SurfaceCard';

const COLORS: Record<string, string> = {
  create: 'teal',
  update: 'blue',
  delete: 'red',
  login: 'grape',
  export: 'yellow',
};

export default function ActivityLogPage() {
  const query = useQuery({ queryKey: queryKeys.activity, queryFn: () => mockActivity.list() });

  return (
    <Stack gap="lg">
      <PageHeader
        title="Activity log"
        description="Auditable history of every change in your workspace."
      />
      <SurfaceCard>
        <Timeline active={3} bulletSize={28} lineWidth={2}>
          {(query.data ?? []).map((a) => (
            <Timeline.Item
              key={a.id}
              bullet={
                <Avatar size={22} radius="xl" color={COLORS[a.kind] ?? 'brand'} variant="light">
                  {initials(a.actor)}
                </Avatar>
              }
              title={
                <Group gap="xs">
                  <Text fz={14} fw={600}>
                    {a.actor}
                  </Text>
                  <Text fz={13} c="dimmed">
                    {a.action}
                  </Text>
                  <Text fz={14} fw={600}>
                    {a.target}
                  </Text>
                  <Badge size="xs" variant="light" color={COLORS[a.kind] ?? 'gray'}>
                    {a.kind}
                  </Badge>
                </Group>
              }
            >
              <Text c="dimmed" size="sm">
                {fromNow(a.createdAt)} · {formatDateTime(a.createdAt)}
              </Text>
            </Timeline.Item>
          ))}
        </Timeline>
      </SurfaceCard>
    </Stack>
  );
}
