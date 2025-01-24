<script setup lang="ts">
import { Url } from '@/config/constants'
import type { ISneakers } from '@/config/types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import axios from 'axios'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import { computed, inject, ref } from 'vue'
import { toast } from 'vue3-toastify'

// const cartItems = ref<ISneakers[]>([])
const client = useQueryClient()
const visible = inject<boolean>('drawer')
const loadingButton = ref(false)

const fetchDataCart = async () => {
	const res = await axios.get<ISneakers[]>(`${Url}/cart`)
	return res.data
}

const deleteCartItem = async (id: string) => {
	const res = await axios.delete(`${Url}/cart/${id}`)
	return res.data
}

const { data: cartItems } = useQuery({
	queryKey: ['cartItem'],
	queryFn: async () => await fetchDataCart()
})

const isEmptyCart = computed(() => cartItems?.value?.length === 0)

const { mutate } = useMutation({
	mutationKey: ['deleteCartItem'],
	mutationFn: async (id: string) => await deleteCartItem(id)
})

const handleClick = (id: string) => {
	mutate(id, {
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['cartItem'] })
			const toastid = toast.success(`Sneaker #${id} delete successfully!`)
			loadingButton.value = toast.isActive(toastid)
				? (loadingButton.value = true)
				: (loadingButton.value = false)
		}
	})
}
</script>

<template>
	<Drawer
		v-model:visible="visible"
		header="Корзина"
		position="right"
		class="bg-white text-black w-[450px] p-6"
	>
		<div v-if="!isEmptyCart" class="h-[85%] flex flex-col gap-4" v-auto-animate>
			<div
				v-for="cartItem in cartItems"
				:key="cartItem.id"
				class="relative flex items-center gap-6 border border-slate-300 p-8 rounded-2xl"
			>
				<img :src="cartItem.imageUrl" :alt="cartItem.title" class="w-[70px] h-[70px]" />
				<div class="flex flex-col w-[150px]">
					<p class="text-sm">{{ cartItem.title }}</p>
					<span class="font-bold">{{ cartItem.price }} руб.</span>
				</div>
				<img
					@click="handleClick(cartItem.id)"
					:disabled="true"
					src="/close.svg"
					alt="plus"
					class="absolute right-4 top-[70px] w-10 cursor-pointer hover:fill-red-500 hover:text-white"
				/>
			</div>
		</div>

		<div v-else class="flex justify-center items-center h-full">
			<div class="flex flex-col gap-1 items-center w-[285px]">
				<img src="/empty-cart.svg" alt="empty-cart" class="w-[120px] h-[120px]" />
				<h2 class="text-xl font-bold">Корзина пустая</h2>
				<p class="text-sm text-center text-slate-400">
					Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ.
				</p>
				<Button
					@click="visible = false"
					label="<- Вернуться назад"
					class="bg-green-500 text-white w-[200px] p-4 mt-10 rounded-xl"
				/>
			</div>
		</div>
	</Drawer>
</template>
