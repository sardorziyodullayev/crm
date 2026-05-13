import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export const formatUZS = (value: number, options: { compact?: boolean } = {}): string => {
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
  } catch {
    return value.toLocaleString() + ' UZS';
  }
};

export const formatNumber = (value: number, opts: Intl.NumberFormatOptions = {}): string => {
  try {
    return new Intl.NumberFormat('uz-UZ', opts).format(value);
  } catch {
    return value.toLocaleString();
  }
};

export const formatDate = (input: string | Date | undefined, fmt = 'MMM D, YYYY'): string => {
  if (!input) return '—';
  return dayjs(input).format(fmt);
};

export const formatDateTime = (input: string | Date | undefined): string =>
  formatDate(input, 'MMM D, YYYY · HH:mm');

export const fromNow = (input: string | Date | undefined): string =>
  input ? dayjs(input).fromNow() : '—';

export const initials = (name: string): string => {
  if (!name) return '?';
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0]!.toUpperCase())
    .join('');
};

export const truncate = (s: string, n = 60) => (s.length > n ? `${s.slice(0, n - 1)}…` : s);

export const formatPhone = (phone: string) => phone;

export const percentageDelta = (current: number, prev: number): number => {
  if (prev === 0) return current > 0 ? 100 : 0;
  return Math.round(((current - prev) / Math.abs(prev)) * 100);
};
