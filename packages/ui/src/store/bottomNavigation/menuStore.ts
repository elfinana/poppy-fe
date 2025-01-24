import { create } from 'zustand';

interface Menu {
  menu: string;
  setMenu: (menu: string) => void;
}

export const useMenu = create<Menu>(set => ({
  menu: '홈',
  setMenu: menu => set({ menu: menu }),
}));
