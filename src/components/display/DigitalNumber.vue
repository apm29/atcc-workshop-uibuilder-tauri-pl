<template>
  <div class="impact">
    <div class="digital-font">
    <span v-if="prefix" text="4xl orange-300">{{ prefix }}</span>
    <span
      v-if="value || value == 0 || value === false || value === true || value === NaN"
      animate="~ pulse"
    >
      {{ valueFormatter(value) }}
    </span>
    <span v-else class="font-seven" line="through"> 0000 </span>
    <span v-if="suffix">{{ suffix }}</span>
  </div>
  </div>
</template>

<script setup>
import { minuteSecondFormatter2 } from "~/helpers/value-formatter"
defineProps({
  value: [Number, String],
  prefix: [String],
  suffix: [String],
  valueFormatter: {
    type: Function,
    default: minuteSecondFormatter2,
  },
});
</script>

<style lang="scss" scoped>
.digital-font {
  font-family: "seven-segment";
  @apply text-sky-200 text-9xl flex flex-col items-center justify-center rounded;
  background-color: #000234;
}
.impact {
  background-image: repeating-linear-gradient(60.5deg,rgba(249, 115, 22,0.8),rgba(249, 115, 22,0.8), 12px,transparent 0,transparent 24px);
  animation: progressMove 15s linear infinite;
  // transform: translateX(-50vw);
  height: 160px;
  width: 360px;
  @apply  py-4 px-2  border rounded border-dashed;
}

@keyframes progressMove {
    0% {
        background-position: 0;
    }
    100% {
        background-position: 230px;
    }
}
</style>
