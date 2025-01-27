import { cartService } from '@/services/cart.service'
import { useMutation } from '@tanstack/vue-query'

export const useDeleteCartItem = () => {
	return useMutation({
		mutationKey: ['deleteCartItem'],
		mutationFn: (id: string) => cartService.deleteCartItem(id)
	})
}
