<script setup lang="ts">
defineProps<{
  searchValue: string
}>()

const emit = defineEmits(['update:searchValue'])
</script>

<template>
  <div class="relative">
    <input
      :value="searchValue"
      @input="emit('update:searchValue', $event.target.value)"
      placeholder="Поиск..."
      class="w-[250px] rounded-lg border pl-8 py-2 bg-white"
    />
    <img src="/search.svg" alt="search" class="absolute left-2 top-[12px] w-[18px] h-[18px]" />
  </div>
</template>
