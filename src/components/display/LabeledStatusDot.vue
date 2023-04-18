<template>
  <div flex="inline" items="center" gap="2">
    <slot></slot>
    <StatusDot :value="value"></StatusDot>
  </div>
</template>

<script setup>
import StatusDot from "./StatusDot.vue"
defineProps({
  value:[Boolean, Number, String]
})
</script>

<style lang="scss" scoped>

</style>
