import { cartService } from '@/services/cart.service'
import { useQuery } from '@tanstack/vue-query'

export const useGetCartItems = () => {
	return useQuery({
		queryKey: ['cartItem'],
		queryFn: () => cartService.getCartItems()
	})
}
