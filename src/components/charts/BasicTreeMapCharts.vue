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
});

const { data } = toRefs(props);

const colors = [
  "#28489b", "#4868db",
  "#2848db", "#4868fb",
  "#6878fb", "#58e8fb",
  "#a9c1fb", "#213b85",
];
const option = computed(() => ({
  backgroundColor: "transparent",
  toolbox:{
    feature: {
      restore:{
        show: true
      }
    }
  },
  series: [
    {
      type: "treemap",
      data: [
        {
          children: unref(data).map((it,index) => {
            return {
              ...it,
              itemStyle: {
                color: colors[index % colors.length]
              },
            };
          }),
        },
      ],
      itemStyle: {
        gapWidth: 8,
        borderWidth: 0,
        borderColor: "transparent",
      },
      label: {
        show: true,
        fontSize: 16,
        textShadowColor: "#000",
        textShadowBlur: 3,
        textShadowOffsetX: 0,
        textShadowOffsetY: 0,
      },
      breadcrumb: {
        show: false,
      },
    },
  ],
}));
</script>

<style lang="scss" scoped></style>
