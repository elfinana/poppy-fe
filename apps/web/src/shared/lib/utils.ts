import { clsx, type ClassValue } from 'clsx';
import { extendTailwindMerge, twMerge } from 'tailwind-merge';

const customMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      'font-size': [{ text: ['h1', 'h2', 'h3', 'h4', 'b1', 'b2', 'b3', 'b3_com', 'b4', 'b5', 'c1', 'c2', 'c3'] }],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return customMerge(clsx(inputs));
}
