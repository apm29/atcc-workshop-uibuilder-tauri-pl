<template>
  <img v-bind="$attrs" :src="getAssetsFile(realPath)"/>
</template>

<script setup>
import { getAssetsFile } from "~/composables/picture/picture";
const props = defineProps({
  value: [Boolean],
  runningPath: String,
  errorPath: String,
  idlePath: String,
});

const realPath = computed(() => {
  const state = props.value;
  console.log(getAssetsFile(props.errorPath));
  switch (state) {
    case undefined:
    case null:
      return props.idlePath;
    case true:
      return props.runningPath;
    case false:
      return props.errorPath;
    default:
      return props.errorPath;
  }
});
</script>

<style lang="scss" scoped></style>
