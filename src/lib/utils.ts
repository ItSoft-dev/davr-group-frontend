import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const DEFAULT_PHONE = "+1 (314) 555-0123";

export function formatPhoneDisplay(phone?: string, fallback = DEFAULT_PHONE) {
  const value = phone?.trim();
  if (!value) {
    return fallback;
  }

  const digits = value.replace(/\D/g, "");
  if (digits.length === 10) {
    return `+1 (${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+1 (${digits.slice(1, 4)}) ${digits.slice(4, 7)}-${digits.slice(7)}`;
  }

  return value;
}

export function formatPhoneHref(phone?: string, fallback = DEFAULT_PHONE) {
  const normalized = phone?.trim() || fallback;
  const digits = normalized.replace(/\D/g, "");

  if (digits.length === 10) {
    return `+1${digits}`;
  }

  if (digits.length === 11 && digits.startsWith("1")) {
    return `+${digits}`;
  }

  return normalized;
}
