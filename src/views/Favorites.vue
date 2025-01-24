<script setup lang="ts">
import type { ISneakers } from '@/config/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import Button from 'primevue/button'
import { ref } from 'vue'

const nameValue = ref('')
const priceValue = ref(0)
const client = useQueryClient()

const { data: favorites } = useQuery({
	queryKey: ['favorites'],
	queryFn: async () => {
		const res = await axios.get<ISneakers[]>('http://localhost:5444/favorites')
		return res.data
	}
})

const { mutate: deleteSneaker, isPending: isDelete } = useMutation({
	mutationFn: async (id: string) => {
		const res = await axios.delete(`http://localhost:5444/favorites/${id}`)
		return res.data
	},
	onSuccess: () => {
		client.invalidateQueries({ queryKey: ['favorites'] })
	}
})

const { mutate: addToCart, isPending: isCreate } = useMutation({
	mutationFn: async (id: string) => {
		const res = await axios.delete(`http://localhost:5444/favorites/${id}`)
		return res.data
	},
	onSuccess: () => {
		client.invalidateQueries({ queryKey: ['cartItem'] })
	}
})
</script>

<template>
	<div class="p-10 flex flex-col gap-4">
		<div
			v-for="favorite in favorites"
			:key="favorite.id"
			class="flex items-center justify-between"
		>
			<img :src="favorite.imageUrl" :alt="favorite.title" class="w-16 h-16" />
			<p>{{ favorite.title }}</p>
			<span class="font-bold">{{ favorite.price }} руб.</span>
			<div class="flex items-center gap-10">
				<Button
					label="Удалить"
					@click="deleteSneaker(favorite.id)"
					:disabled="isDelete"
					class="w-[120px] h-[50px] text-white bg-red-500 rounded-xl hover:bg-red-500/50"
				/>
				<Button
					label="В корзину"
					:disabled="isCreate"
					class="w-[120px] h-[50px] text-white bg-green-500 rounded-xl hover:bg-green-500/50"
				/>
			</div>
		</div>
	</div>
</template>
