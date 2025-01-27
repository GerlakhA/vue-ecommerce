import { Url } from '@/config/constants'
import type { ISneakers } from '@/config/types'
import axios from 'axios'
import { toast } from 'vue3-toastify'

export const cartService = {
	async getCartItems() {
		try {
			const res = await axios.get<ISneakers[]>(`${Url}/cart`)
			return res.data
		} catch (error) {
			toast.error(error)
		}
	},
	async addToCart(data: Omit<ISneakers, 'id'>) {
		try {
			const res = await axios.post<Omit<ISneakers, 'id'>>(`${Url}/cart`, data)
			return res.data
		} catch (error) {
			toast.error(error)
		}
	},
	async deleteCartItem(id: string) {
		try {
			const res = await axios.delete(`${Url}/cart/${id}`)
			return res.data
		} catch (error) {
			toast.error(error)
		}
	}
}
