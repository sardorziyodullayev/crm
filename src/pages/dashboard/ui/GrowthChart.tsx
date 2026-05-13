import { Skeleton } from '@mantine/core';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface GrowthChartProps {
  data: { month: string; students: number; leads: number }[];
  loading?: boolean;
}

export function GrowthChart({ data, loading }: GrowthChartProps) {
  if (loading) return <Skeleton h={260} radius="md" />;
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data} barCategoryGap={18} margin={{ top: 12, right: 8 }}>
        <CartesianGrid stroke="rgba(140,150,180,.18)" strokeDasharray="3 6" vertical={false} />
        <XAxis
          dataKey="month"
          tick={{ fill: 'var(--app-text-muted)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: 'var(--app-text-muted)', fontSize: 11 }}
          axisLine={false}
          tickLine={false}
        />
        <Tooltip
          cursor={{ fill: 'rgba(99,102,241,.06)' }}
          contentStyle={{
            background: 'var(--app-bg-elevated)',
            border: '1px solid var(--app-border)',
            borderRadius: 12,
            fontSize: 12,
          }}
        />
        <Legend
          wrapperStyle={{ paddingTop: 4 }}
          iconType="circle"
          formatter={(v) => <span style={{ color: 'var(--app-text-muted)', fontSize: 12 }}>{v}</span>}
        />
        <Bar dataKey="students" name="Students" fill="#7944ff" radius={[6, 6, 0, 0]} />
        <Bar dataKey="leads" name="Leads" fill="#34d399" radius={[6, 6, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
