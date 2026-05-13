import { Avatar, AvatarGroup, Tooltip } from '@mantine/core';

import { initials } from '@shared/lib/format';

interface AvatarStackProps {
  people: { id: string; name: string; avatarUrl?: string }[];
  max?: number;
  size?: number;
}

export function AvatarStack({ people, max = 4, size = 28 }: AvatarStackProps) {
  const visible = people.slice(0, max);
  const overflow = people.length - visible.length;
  return (
    <AvatarGroup spacing="sm">
      {visible.map((p) => (
        <Tooltip key={p.id} label={p.name} withArrow>
          <Avatar src={p.avatarUrl} size={size} radius="xl" color="brand">
            {initials(p.name)}
          </Avatar>
        </Tooltip>
      ))}
      {overflow > 0 && (
        <Avatar size={size} radius="xl" color="gray" variant="light">
          +{overflow}
        </Avatar>
      )}
    </AvatarGroup>
  );
}
