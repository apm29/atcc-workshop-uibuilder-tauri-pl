<template>
  <BasicCharts :option="option"></BasicCharts>
</template>

<script setup>
import * as echarts from "echarts";
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
    left: 80,
    top: "top",
  },
  xAxis: {
    max: "dataMax",
    interval: 0,
   
  },
  
  yAxis: {
    type: "category",
    data: unref(dataAxisX),
    inverse: true,
    animationDuration: 300,
    animationDurationUpdate: 300,
    max: 5, // only the largest 3 bars will be displayed
    axisTick: {
      show: false
    },
    splitTick: {
      show: false
    },
    axisLine: {
      show: false
    },
    axisLabel:{
      color:"#fff",
      fontSize:16
    }
  },
  series: [
    {
      realtimeSort: true,
      type: "bar",
      data: unref(data),
      label: {
        show: true,
        position: "right",
        valueAnimation: true,
        color:"#fff",
        fontSize:"15",
        formatter:"{c}次"
      },
      itemStyle: {
        borderRadius: 100,
        color: new echarts.graphic.LinearGradient(1, 1, 0, 0, [
          { offset: 0, color: "#188df0" },
          { offset: 0.5, color: "#688df0" },
          { offset: 1, color: "#83bff6" },
        ]),
      },
      barWidth: "50%"
    },
  ],
  legend: {
    show: false,
  },
  animationDuration: 0,
  animationDurationUpdate: 3000,
  animationEasing: "linear",
  animationEasingUpdate: "linear",
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
}));
</script>

<style lang="scss" scoped></style>
