<template>
  <div flex="~" items="center" class="round-switch">
    <div flex="~ grow" items="center" min="w-7.5rem">
      <StatusDot v-if="dot" :value="value"></StatusDot>
      <slot name="label">
        <span text="light-50" font="bold" ml="2"> {{ label }} </span>
      </slot>
      <slot name="default"></slot>
    </div>
    <SmallSwitch
      :value="value"
      @input="handleClick"
      @mousedown="$emit('mousedown', value)"
      @mouseup="$emit('mouseup', value)"
      :activeLabel="activeLabel"
      :inactiveLabel="inactiveLabel"
      :disabled="disabled"
    ></SmallSwitch>
  </div>
</template>

<script setup>
import SmallSwitch from "../display/SmallSwitch.vue";
import StatusDot from "../display/StatusDot.vue";
defineProps({
  value: [Boolean, Number, String],
  label: [String],
  dot: [Boolean],
  disabled: [Boolean],
  activeLabel: String,
  inactiveLabel: String,
});
const emits = defineEmits(["input"]);

function handleClick(newVal) {
  emits("input", newVal);
}
</script>
