import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function deepCopy<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
      return obj;
  }

  if (Array.isArray(obj)) {
      return obj.map(item => deepCopy(item)) as unknown as T;
  }

  const copy = {} as T;
  for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
          copy[key] = deepCopy(obj[key]);
      }
  }
  return copy;
}