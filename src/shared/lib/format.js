import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
export const formatUZS = (value, options = {}) => {
    if (options.compact) {
        if (Math.abs(value) >= 1_000_000_000)
            return `${(value / 1_000_000_000).toFixed(1).replace(/\.0$/, '')} bln`;
        if (Math.abs(value) >= 1_000_000)
            return `${(value / 1_000_000).toFixed(1).replace(/\.0$/, '')} mln`;
        if (Math.abs(value) >= 1_000)
            return `${(value / 1_000).toFixed(1).replace(/\.0$/, '')} k`;
        return value.toString();
    }
    try {
        return new Intl.NumberFormat('uz-UZ').format(value) + ' UZS';
    }
    catch {
        return value.toLocaleString() + ' UZS';
    }
};
export const formatNumber = (value, opts = {}) => {
    try {
        return new Intl.NumberFormat('uz-UZ', opts).format(value);
    }
    catch {
        return value.toLocaleString();
    }
};
export const formatDate = (input, fmt = 'MMM D, YYYY') => {
    if (!input)
        return '—';
    return dayjs(input).format(fmt);
};
export const formatDateTime = (input) => formatDate(input, 'MMM D, YYYY · HH:mm');
export const fromNow = (input) => input ? dayjs(input).fromNow() : '—';
export const initials = (name) => {
    if (!name)
        return '?';
    return name
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((p) => p[0].toUpperCase())
        .join('');
};
export const truncate = (s, n = 60) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);
export const formatPhone = (phone) => phone;
export const percentageDelta = (current, prev) => {
    if (prev === 0)
        return current > 0 ? 100 : 0;
    return Math.round(((current - prev) / Math.abs(prev)) * 100);
};
