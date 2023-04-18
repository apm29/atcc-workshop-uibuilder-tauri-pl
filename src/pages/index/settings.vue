<template>
  <div
    p="x-4 y-6"
    :style="{
      width: elementWidth,
      height: elementHeight,
      margin: '0 auto',
    }"
    text="white"
    grid="~ cols-12"
  >
    <div class="item-container">
      <div class="item-title">版本</div>
      <div class="item-value">v{{ version }}</div>
    </div>
  </div>
</template>

<script setup>
import { useUiBuilder } from "~/composables/uibuilder";
import { useDefaultPageSize } from "~/composables/size/page";
import { Notification } from "element-ui";
const { elementHeight, elementWidth } = useDefaultPageSize();
const version = computed(()=>{
  return "0.0.0"
})
</script>
