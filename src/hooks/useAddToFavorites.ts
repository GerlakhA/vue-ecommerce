import type { ISneakers } from '@/config/types'
import { favoritesService } from '@/services/favorites.service'
import { useMutation } from '@tanstack/vue-query'

export const useAddToFavorites = () => {
	return useMutation({
		mutationFn: (data: Omit<ISneakers, 'id'>) => favoritesService.addToFavorite(data)
	})
}
