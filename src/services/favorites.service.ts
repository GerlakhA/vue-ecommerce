import { Url } from '@/config/constants'
import type { ISneakers } from '@/config/types'
import axios from 'axios'
import { toast } from 'vue3-toastify'

export const favoritesService = {
	async getFavorites() {
		const { data } = await axios.get<ISneakers[]>(`${Url}/favorites`)

		return data
	},

	async addToFavorite(data: Omit<ISneakers, 'id'>) {
		try {
			const res = await axios.post<Omit<ISneakers, 'id'>>(`${Url}/favorites`, data)
			return res.data
		} catch (error) {
			toast.error(error)
		}
	},

	async deleteFavoriteItem(id: string) {
		const { data } = await axios.delete(`${Url}/favorites/${id}`)

		return data
	}
}
