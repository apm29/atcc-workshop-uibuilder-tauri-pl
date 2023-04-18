<template>
  <BasicCharts ref="chart" :option="option"></BasicCharts>
</template>

<script setup>
import * as echarts from "echarts";
import BasicCharts from "./BasicCharts";
import dayjs from "dayjs";
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  month: {
    type: String,
    default: () => dayjs().format("YYYY-MM"),
  },
  title: String,
});
const chart = ref()
const { width, height } = useElementSize(chart)
const cellSize = computed(()=>{

  return [width.value  * 0.8 / 7, height.value * 0.8 / 6 ]
});
const pieRadius = computed(()=>{
  return Math.min(cellSize.value[0],cellSize.value[1])/2 - 3
});
const { data, title, month } = toRefs(props);
const dayOfMonth = dayjs(month.value).daysInMonth();

const scatterData = Array.from({ length: dayOfMonth }).map((_, index) => {
  return [
    dayjs(month.value)
      .date(index + 1)
      .format("YYYY-MM-DD"),
    index + 1,
  ];
});
const pieData = computed(() => {
  return data.value.map((dayData, index) => {
    return {
      type: "pie",
      id: "pie" + index,
      center: dayData.date,
      radius: pieRadius.value,
      coordinateSystem: "calendar",
      label: {
        formatter: "{c}",
        position: "inside",
      },
      data: [
        {
          name: "未巡",
          value: dayData.plan - dayData.complete,
          itemStyle:{
            color:"#dd8888"
          }
        },
        {
          name: "已巡",
          value: dayData.complete,
          itemStyle:{
            color:"#44bb56"
          }
        },
      ],
    };
  });
});
const option = computed(() => ({
  backgroundColor: "transparent",
  calendar: {
    top: "middle",
    left: "center",
    orient: "vertical",
    cellSize: cellSize.value,
    yearLabel: {
      show: false,
      fontSize: 30,
    },
    dayLabel: {
      margin: 0,
      firstDay: 1,
      nameMap: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"],
      fontSize: 17,
      color:"#dfdfdf"
    },
    monthLabel: {
      show: false,
    },
    range: [month.value],
    itemStyle:{
      normal:{
        color:"transparent",
        borderColor: "#33467f"
      }
    },
    splitLine:{
      lineStyle:{
        color:"#33467f"
      }
    }
  },
  title: {
    text: unref(title),
    textStyle: {
      fontSize: 16,
    },
    left: "center",
    top: "center",
  },
  grid: {
    top: 0,
  },
  legend: {
    show: true,
    top: 5,
    left: 10,
    data: ["已巡", "未巡"],
    orient: "vertical"
  },
  tooltip: {
    show: true,
  },
  series: [
    {
      id: "label",
      type: "scatter",
      coordinateSystem: "calendar",
      symbolSize: 0,
      label: {
        show: true,
        formatter: function (params) {
          return echarts.time.format(params.value[0], "{dd}", false);
        },
        textStyle: {
          color: "white",
        },
        offset: [-cellSize.value[0] / 2 + 10, -cellSize.value[1] / 2 + 10],
        fontSize: 14,
      },
      tooltip:{
        show: false
      },
      data: scatterData,
    },

    ...pieData.value,
  ],
}));
</script>

<style lang="scss" scoped></style>
