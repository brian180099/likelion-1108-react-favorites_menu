import { create } from "zustand";

export const useFavoriteStore = create((set) => ({
  favoriteIds: [],
  toggleFavorite: (id) =>
    set((state) => ({
      favoriteIds: state.favoriteIds.includes(id)
        ? state.favoriteIds.filter((favoriteId) => favoriteId !== id)
        : [...state.favoriteIds, id],
    })),
  // 같은 store를 사용하는 헤더, 상세, 찜 목록에 동시에 반영됩니다.
  clearFavorites: () => set({ favoriteIds: [] }),
}));
