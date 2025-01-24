<script setup lang="ts">
import Cart from '@/components/Cart.vue'
import Header from '@/components/Header.vue'
import { provide, ref } from 'vue'
import { RouterView } from 'vue-router'

const visible = ref(false)

provide('drawer', visible)
</script>

<template>
	<main>
		<Cart />
		<div class="bg-white w-4/5 h-full m-auto rounded-xl shadow-xl mt-14">
			<Header />
			<RouterView />
		</div>
	</main>
</template>
