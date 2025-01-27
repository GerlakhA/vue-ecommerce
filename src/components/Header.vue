<script setup lang="ts">
import { useGetCartItems } from '@/hooks/useCartItems'
import { computed, inject, type Ref } from 'vue'
import { RouterLink } from 'vue-router'

const visible = inject<Ref<boolean, boolean>>('drawer')
const { data: cartItems } = useGetCartItems()
const checkCartItems = computed(() =>
	cartItems?.value?.length ? cartItems?.value?.length : null
)
</script>

<template>
	<header
		class="w-full flex justify-between items-center border-b border-b-slate-300 px-10 py-8"
	>
		<div class="flex items-center gap-4">
			<RouterLink to="/">
				<img src="/logo.png" alt="logo" class="w-16 h-16" />
			</RouterLink>
			<div class="">
				<h1 class="font-bold text-xl uppercase text-black">Vue Sneakers</h1>
				<p class="text-neutral-400">Магазин лучших кроссовок</p>
			</div>
		</div>

		<div class="flex items-center justify-around w-[650px]">
			<ul class="flex items-center gap-10">
				<li
					@click="visible = true"
					class="relative flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black"
				>
					<img src="/cart.svg" alt="Cart" class="w-8 h-8" />
					<div class="flex flex-col">
						<b v-if="checkCartItems">{{ cartItems?.length }} шт.</b>
						<b>1205 руб.</b>
					</div>
				</li>

				<RouterLink to="/favorites">
					<li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
						<img src="/heart.svg" alt="favorites" class="w-8 h-8" />
						<span class="font-semibold">Избранные</span>
					</li>
				</RouterLink>

				<RouterLink to="/profile">
					<li class="flex items-center cursor-pointer gap-3 text-gray-500 hover:text-black">
						<img src="/profile.svg" alt="profile" class="w-8 h-8" />
						<span class="font-semibold">Профиль</span>
					</li>
				</RouterLink>
			</ul>
		</div>
	</header>
</template>
