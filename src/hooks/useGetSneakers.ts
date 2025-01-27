import { sneakersService } from '@/services/sneakers.service'
import { useQuery } from '@tanstack/vue-query'

export const useGetSneakers = () => {
	return useQuery({
		queryKey: ['getSneakers'],
		queryFn: () => sneakersService.getSneakers()
	})
}
