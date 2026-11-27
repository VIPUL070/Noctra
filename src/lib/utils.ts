import { ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function daysAgo(createdAt: Date | string | number): number {
  const created = new Date(createdAt);
  if (Number.isNaN(created.getTime())) return NaN;

  const MS_PER_DAY = 24 * 60 * 60 * 1000;
  const diffMs = Date.now() - created.getTime();
  const days = Math.floor(diffMs / MS_PER_DAY);
  return days;
}
