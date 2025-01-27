<script setup lang="ts">
import type { ISneakers } from '@/config/types'
import { useAddToCart } from '@/hooks/useAddToCart'
import { useAddToFavorites } from '@/hooks/useAddToFavorites'
import { useQueryClient } from '@tanstack/vue-query'
import Button from 'primevue/button'
import { toast } from 'vue3-toastify'

defineProps<{
	sneaker: ISneakers
}>()

const client = useQueryClient()
// const isFavorite = ref(false)
// const favoriteImg = computed(() => (isFavorite.value ? '/like-2.svg' : '/like-1.svg'))

const { mutate: addToFavorites } = useAddToFavorites()

const { mutate: addToCart } = useAddToCart()

const handleClickFavorite = (e: MouseEvent, data: Omit<ISneakers, 'id'>) => {
	e.stopPropagation()
	addToFavorites(
		{ ...data, isFavotite: true },
		{
			onSuccess: () => {
				client.invalidateQueries({ queryKey: ['cartItem'] })
				toast.success(`${data.title} add to favorites successfully!`)
			}
		}
	)
}

const handleClickCart = (e: MouseEvent, data: Omit<ISneakers, 'id'>) => {
	e.stopPropagation()
	addToCart(data, {
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['cartItem'] })
			toast.success(`${data.title} add to cart successfully!`)
		}
	})
}
</script>

<template>
	<div
		class="relative bg-white border-2 border-slate-100 rounded-3xl p-8 cursor-pointer transition hover:-translate-y-2 hover:shadow-xl"
	>
		<Button
			icon=" pi pi-heart"
			@click="e => handleClickFavorite(e, sneaker)"
			class="absolute top-8 left-8 w-12 h-12"
		>
			<img
				:src="sneaker.isFavotite ? '/like-2.svg' : '/like-1.svg'"
				alt="favorite"
				class="w-12 h-12"
			/>
		</Button>

		<img :src="sneaker.imageUrl" alt="Sneaker" />

		<p class="mt-2 text-black">{{ sneaker.title }}</p>

		<div class="flex items-center justify-between mt-5">
			<div class="flex flex-col">
				<span class="text-slate-400">Цена:</span>
				<b class="text-black">{{ sneaker.price }} руб.</b>
			</div>
			<Button
				@click="e => handleClickCart(e, sneaker)"
				label="В корзину"
				class="w-[120px] h-[50px] text-white bg-green-500 rounded-xl hover:bg-green-500/60"
			/>
		</div>
	</div>
</template>
