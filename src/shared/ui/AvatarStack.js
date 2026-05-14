import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Avatar, AvatarGroup, Tooltip } from '@mantine/core';
import { initials } from '@shared/lib/format';
export function AvatarStack({ people, max = 4, size = 28 }) {
    const visible = people.slice(0, max);
    const overflow = people.length - visible.length;
    return (_jsxs(AvatarGroup, { spacing: "sm", children: [visible.map((p) => (_jsx(Tooltip, { label: p.name, withArrow: true, children: _jsx(Avatar, { src: p.avatarUrl, size: size, radius: "xl", color: "brand", children: initials(p.name) }) }, p.id))), overflow > 0 && (_jsxs(Avatar, { size: size, radius: "xl", color: "gray", variant: "light", children: ["+", overflow] }))] }));
}
