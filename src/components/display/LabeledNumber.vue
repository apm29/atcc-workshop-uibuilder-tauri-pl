<template>
  <div flex="inline" items="center" gap="2">
    <slot></slot>
    <div
      border="1 light-50"
      text="blue-200"
      min-w="24"
      min-h="6"
      whitespace="nowrap"
      p="x-3"
      font="bold"
      flex="~"
      items="center"
      justify="between"
      bg="dark-900"
    >
    <span text="sm" v-if="prefix">{{ prefix }}</span>
      <span class="font-seven" v-if="value || value==0 || value === false || value === true || value === NaN">
        {{ valueFormatter(value) }}
      </span>
      <span v-else class="font-seven" line="through"> 0000 </span>
      <span text="sm" v-if="suffix">{{ suffix }}</span>
    </div>
  </div>
</template>

<script setup>
defineProps({
  value:[Boolean, Number, String],
  suffix:[Boolean, Number, String],
  prefix:[Boolean, Number, String],
  valueFormatter: {
    type: Function,
    default: (value) => {
      return value;
    },
  },
})
</script>

<style lang="scss" scoped>
.font-seven{
  font-family: "seven-segment";
}
</style>
