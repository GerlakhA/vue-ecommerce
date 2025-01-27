import type { ISneakers } from '@/config/types'
import { cartService } from '@/services/cart.service'
import { useMutation } from '@tanstack/vue-query'

export const useAddToCart = () => {
	return useMutation({
		mutationFn: (data: Omit<ISneakers, 'id'>) => cartService.addToCart(data)
	})
}
