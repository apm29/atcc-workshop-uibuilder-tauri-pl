<template>
  <div text="center base gray-300/80">{{ time }}</div>
</template>

<script setup>
import dayjs from 'dayjs';
const time = ref(dayjs().format(`YYYY年MM月DD日 dddd HH点mm分ss秒`));
const getRefreshTime = function () {
  time.value = dayjs().format(`YYYY年MM月DD日 dddd HH点mm分ss秒`);
};
const timer = setInterval(getRefreshTime, 1000);
onBeforeUnmount(() => {
  clearInterval(timer);
});
</script>

<style lang="scss" scoped></style>
