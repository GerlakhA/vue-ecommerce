<script setup lang="ts">
import { useGetCartItems } from '@/hooks/useCartItems'
import { useDeleteCartItem } from '@/hooks/useDeleteCartItem'
import { useQueryClient } from '@tanstack/vue-query'
import Button from 'primevue/button'
import Drawer from 'primevue/drawer'
import { computed, inject } from 'vue'
import { toast } from 'vue3-toastify'

const client = useQueryClient()
const visible = inject<boolean>('drawer')

const { data: cartItems } = useGetCartItems()

const isEmptyCart = computed(() => cartItems?.value?.length === 0)

const { mutate: deleteCartItem } = useDeleteCartItem()

const handleClick = (id: string) => {
	deleteCartItem(id, {
		onSuccess: () => {
			client.invalidateQueries({ queryKey: ['cartItem'] })
			toast.success(`Sneaker #${id} delete successfully!`)
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
				class="relative flex items-center gap-6 border border-slate-300 p-8 rounded-2xl first:mt-10"
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
