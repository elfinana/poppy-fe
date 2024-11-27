import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge, twMerge } from 'tailwind-merge';

const customMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['h1'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customMerge(clsx(inputs));
}
