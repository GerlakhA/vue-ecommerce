<script setup lang="ts">
import Search from '@/components/Search.vue'
import SneakersCard from '@/components/SneakersCard.vue'

import { useGetSneakers } from '@/hooks/useGetSneakers'
import { computed, ref } from 'vue'

const searchValue = ref('')

const { data: sneakers } = useGetSneakers()

const filterSneakers = computed(() => {
	return sneakers.value?.filter(item =>
		item.title.toLowerCase().includes(searchValue.value.toLowerCase())
	)
})
</script>

<template>
	<div class="p-10 flex item-center justify-between">
		<h2 class="font-bold text-4xl">Все кроссовки</h2>
		<Search
			:modelValue="searchValue"
			@update:searchValue="$event => (searchValue = $event)"
			:search-value="searchValue"
		/>
	</div>
	<div class="p-10 grid grid-cols-4 gap-8" v-auto-animate>
		<SneakersCard v-for="sneaker in filterSneakers" :key="sneaker.id" :sneaker="sneaker" />
	</div>
</template>
