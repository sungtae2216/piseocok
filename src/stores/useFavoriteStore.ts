import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface FavoriteState {
  favoriteIds: string[]
  isFavorite: (spotId: string) => boolean
  toggleFavorite: (spotId: string) => void
}

export const useFavoriteStore = create<FavoriteState>()(
  persist(
    (set, get) => ({
      favoriteIds: [],
      isFavorite: (spotId) => get().favoriteIds.includes(spotId),
      toggleFavorite: (spotId) =>
        set((state) => ({
          favoriteIds: state.favoriteIds.includes(spotId)
            ? state.favoriteIds.filter((id) => id !== spotId)
            : [...state.favoriteIds, spotId],
        })),
    }),
    { name: 'piseokok-favorites' },
  ),
)
