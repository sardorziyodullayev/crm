import { Box, Group, Skeleton, Stack, Text } from '@mantine/core';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import { SurfaceCard } from '@shared/ui/SurfaceCard';

const COLORS = ['#7944ff', '#60a5fa', '#34d399', '#ffac1a', '#f12648', '#22d3ee'];

interface LeadSourcesProps {
  data: { source: string; value: number }[];
  loading?: boolean;
}

export function LeadSources({ data, loading }: LeadSourcesProps) {
  const total = data.reduce((s, d) => s + d.value, 0);

  return (
    <SurfaceCard h="100%">
      <Stack gap="md">
        <Stack gap={2}>
          <Text fz={12} c="dimmed" tt="uppercase" fw={600} style={{ letterSpacing: 0.6 }}>
            Lead sources
          </Text>
          <Text fz={16} fw={700}>
            Where prospects are coming from
          </Text>
        </Stack>
        <Box pos="relative" h={180}>
          {loading ? (
            <Skeleton h={180} circle />
          ) : (
            <>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Tooltip
                    contentStyle={{
                      background: 'var(--app-bg-elevated)',
                      border: '1px solid var(--app-border)',
                      borderRadius: 10,
                      fontSize: 12,
                    }}
                  />
                  <Pie
                    data={data}
                    dataKey="value"
                    nameKey="source"
                    innerRadius={56}
                    outerRadius={84}
                    paddingAngle={3}
                    stroke="none"
                    isAnimationActive
                    animationDuration={700}
                  >
                    {data.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Stack
                pos="absolute"
                top="50%"
                left="50%"
                gap={0}
                ta="center"
                style={{ transform: 'translate(-50%, -50%)' }}
              >
                <Text fz={22} fw={800} style={{ letterSpacing: '-0.02em' }}>
                  {total}
                </Text>
                <Text fz={11} c="dimmed">
                  total leads
                </Text>
              </Stack>
            </>
          )}
        </Box>
        <Stack gap={6}>
          {data.map((d, i) => (
            <Group key={d.source} justify="space-between">
              <Group gap="xs">
                <Box
                  w={10}
                  h={10}
                  style={{ background: COLORS[i % COLORS.length], borderRadius: 999 }}
                />
                <Text fz={13}>{d.source}</Text>
              </Group>
              <Text fz={13} c="dimmed">
                {d.value} ({total ? Math.round((d.value / total) * 100) : 0}%)
              </Text>
            </Group>
          ))}
        </Stack>
      </Stack>
    </SurfaceCard>
  );
}
