import { Badge, type BadgeProps } from '@mantine/core';

import { colorForStatus } from '@shared/lib/colors';

interface StatusBadgeProps extends Omit<BadgeProps, 'color' | 'children'> {
  status: string;
  label?: string;
}

export function StatusBadge({ status, label, variant = 'light', ...rest }: StatusBadgeProps) {
  const color = colorForStatus(status);
  const display = label ?? status.replace(/_/g, ' ');
  return (
    <Badge color={color} variant={variant} radius="sm" tt="capitalize" {...rest}>
      {display}
    </Badge>
  );
}
