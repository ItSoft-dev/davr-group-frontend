import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const DEFAULT_PHONE = "+1 (405) 885-9080";
export const DEFAULT_ADDRESS = "707 Lepere Ave Apt H, Saint Louis, MO 63132, USA";

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
