<template>
  <BasicCharts :option="option"></BasicCharts>
</template>

<script setup>
import BasicCharts from "./BasicCharts";
const props = defineProps({
  data: {
    type: Array,
    required: true,
    default: () => [],
  },
  dataAxisX: {
    type: Array,
    required: true,
    default: () => [],
  },
});

const { data, dataAxisX } = toRefs(props);

const option = computed(() => ({
  backgroundColor: "transparent",
  grid: {
    bottom: 25,
  },
  xAxis: {
    data: unref(dataAxisX),
    type: "category"
  },
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  calculable: true,
  yAxis: {
    axisTick: {
      show: true,
    },
  },
  legend:{
    show: true,
    right: 30
  },
  dataZoom: [
    {
      type: "inside",
      xAxisIndex: [0],
      start: 67,
      end: 100,
    },
  ],
  series: unref(data).map((it) => ({
    ...it,
    type: "bar",
  })),
}));
</script>

<style lang="scss" scoped></style>
