import { Url } from '@/config/constants'
import type { ISneakers } from '@/config/types'
import axios from 'axios'

export const sneakersService = {
	async getSneakers() {
		const { data } = await axios.get<ISneakers[]>(`${Url}/sneakers`)

		return data
	}
}
