import { Skeleton } from '@mantine/core';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

import { formatUZS } from '@shared/lib/format';

interface RevenueChartProps {
  data: { month: string; revenue: number; target: number }[];
  loading?: boolean;
}

export function RevenueChart({ data, loading }: RevenueChartProps) {
  if (loading) return <Skeleton h={280} radius="md" />;
  return (
    <ResponsiveContainer width="100%" height={280}>
      <AreaChart data={data} margin={{ top: 10, left: 0, right: 8, bottom: 0 }}>
        <defs>
          <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7944ff" stopOpacity={0.6} />
            <stop offset="100%" stopColor="#7944ff" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="revenueStroke" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#60a5fa" />
          </linearGradient>
        </defs>
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
          tickFormatter={(v) => formatUZS(v as number, { compact: true }).replace(' UZS', '')}
        />
        <Tooltip
          contentStyle={{
            background: 'var(--app-bg-elevated)',
            border: '1px solid var(--app-border)',
            borderRadius: 12,
            boxShadow: 'var(--app-shadow-card)',
            fontSize: 12,
          }}
          formatter={(v: number) => formatUZS(v, { compact: true })}
          labelStyle={{ color: 'var(--app-text-muted)', marginBottom: 4 }}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="url(#revenueStroke)"
          strokeWidth={2.5}
          fill="url(#revenueGradient)"
          activeDot={{ r: 4 }}
          isAnimationActive
          animationDuration={700}
        />
        <Line
          type="monotone"
          dataKey="target"
          stroke="#34d399"
          strokeWidth={1.5}
          strokeDasharray="4 4"
          dot={false}
          isAnimationActive
          animationDuration={700}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
