import { DEFAULT_ERROR_MESSAGES } from "@/lib/constants";
import { isAxiosError } from "axios";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getCustomErrorCode(error: unknown): number {
  return isAxiosError(error) ? error.response?.status ?? 999 : 999;
}

export function handleApiError(
  error: unknown,
  errorMessages?: Record<number, string>
): never {
  errorMessages = {
    ...DEFAULT_ERROR_MESSAGES,
    ...errorMessages,
  };

  const code = getCustomErrorCode(error);
  const message = errorMessages[code] || errorMessages[999];
  throw new Error(message);
}
