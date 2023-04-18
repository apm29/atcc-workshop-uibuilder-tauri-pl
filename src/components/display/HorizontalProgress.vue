<template>
  <div inline="block" w="24" bg="green-600/50" h="4" rounded="~" overflow="hidden">
    <div :style="{ width: `${value * 1.00}%`}" h="full" bg="green-500" text="xs left shadow-lg">
     <span vertical="base" p="x-1"> {{ (value * 1.0).toFixed(1) }}%</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  value:Number
})
</script>

<style lang="scss" scoped>

</style>
