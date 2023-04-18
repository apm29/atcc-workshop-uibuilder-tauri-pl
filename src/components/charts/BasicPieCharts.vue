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
  title: String,
});

const { data, title } = toRefs(props);

const option = computed(() => ({
  backgroundColor: "transparent",
  title: {
    text: unref(title),
    textStyle: {
      fontSize: 16,
    },
    left: "center",
    top: "center",
  },
  grid:{
    top: 0,
  },
  legend: {
    show: true,
    bottom: "bottom",
    orient:"horizontal",
    textStyle:{
      color: "rgb(44,252,251)",
      fontSize: 15,
    },
    formatter:function(name){
      const sum = props.data.map(it=>it.value).reduce((sum,current)=>{
        return sum + current
      })
      const value = props.data.find(it=>it.name === name)?.value ?? 0
      return `${name} ${(value/sum*100).toFixed(2)}%`
    }
  },
  tooltip:{
    show: true
  },
  series: [
    {
      type: "pie",
      label: {
        show: true,
        position: "inside",
        emphasis: {
          show: true,
        },
        formatter: "{c}",
        color:"#fff",
        fontSize: 15
      },
      labelLine: {
        show: false,
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "30",
          fontWeight: "bold",
        },
      },
      data: unref(data),
      radius: ["30%", "60%"],
      center:['50%', '35%'],
    },
  ],
}));
</script>

<style lang="scss" scoped></style>
