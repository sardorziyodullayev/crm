import { jsx as _jsx } from "react/jsx-runtime";
import { Badge } from '@mantine/core';
import { colorForStatus } from '@shared/lib/colors';
export function StatusBadge({ status, label, variant = 'light', ...rest }) {
    const color = colorForStatus(status);
    const display = label ?? status.replace(/_/g, ' ');
    return (_jsx(Badge, { color: color, variant: variant, radius: "sm", tt: "capitalize", ...rest, children: display }));
}
