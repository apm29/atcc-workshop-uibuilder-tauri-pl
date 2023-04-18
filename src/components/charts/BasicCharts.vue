<template>
  <div ref="chartContainer"></div>
</template>

<script setup>
// 引入 echarts 核心模块，核心模块提供了 echarts 使用必须要的接口。
import * as echarts from "echarts/core";
import { useElementSize } from "@vueuse/core";
const chartContainer = ref();

const props = defineProps({
  option: {
    type: Object,
    default: () => ({}),
    required: true,
  },
  //主题,dark, light
  theme: {
    type:String,
    default: "dark"
  }
});

const { option, theme } = toRefs(props);

function reload() {
  handleUnmounted();
  echarts.init(unref(chartContainer), theme.value ?? "dark");
  resetOption();
}
const handleUnmounted = () => {
  try {
    const charts = echarts.getInstanceByDom(unref(chartContainer));
    if (charts) {
      charts.dispose();
    }
  } catch (error) {
    console.log(error);
  }
};

const { width, height } = useElementSize(chartContainer);
const { width:windowWidth, height:windowHeight } = useWindowSize();
watch([width, height,windowWidth,windowHeight], () => {
  const charts = echarts.getInstanceByDom(unref(chartContainer));
  if (charts) {
    charts.resize();
  }
});
function resetOption() {
  const charts = echarts.getInstanceByDom(unref(chartContainer));
  if (charts) {
    charts.setOption(unref(option));
  }
}
onMounted(reload);
onBeforeUnmount(handleUnmounted);

watch(option, resetOption, { deep: true });
watch(theme, reload, { deep: true });
</script>

<style lang="scss" scoped></style>
