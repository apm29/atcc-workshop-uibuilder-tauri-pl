<template>
  <div
    w="10"
    font="bold"
    rounded="full"
    text="center sm"
    select="none"
    overflow="hidden"
    cursor="pointer"
    bg="light-50"
    flex="inline"
    items="center"
    justify="center"
  >
    <template v-if="!error">
      <div
      w="50%"
      :text="!value ? 'white xs' : 'gray-300 xs'"
      :bg="!value ? 'gray-500' : 'white'"
      font="bold"
      transition="color duration-300 ease"
      @click="$emit('input', false)"
      p="l-1.25"
    >
      关
    </div>
    <div
      w="50%"
      font="bold"
      :text="value ? 'white xs' : 'gray-300 xs'"
      :bg="value ? 'green-500' : 'white'"
      transition="color duration-300 ease"
      @click="$emit('input', true)"
      p="r-1.25"
    >
      开
    </div>
    </template>
    <div v-else text="red-500 xs center">
      故障
    </div>
  </div>
</template>

<script setup>
defineProps({
  value: [Boolean, Number, String],
  error: [Boolean, Number, String],
});
const emits = defineEmits(["input"]);
</script>
