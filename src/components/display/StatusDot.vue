<template>
  <div
    w="18px"
    h="18px"
    rounded="full"
    inline="flex"
    vertical="text-bottom"
    justify="center"
    items="center"
    :bg="value ? '[rgb(41,253,47)]' : '[rgb(252,13,27)]'"
    :bg-opacity="showError && error ? 50 : 100"
    class="status-dot"
  >
    <el-popover trigger="click" placement="top" v-if="showError && error" w="18px" h="18px">
      <i i-carbon-warning slot="reference" w="18px" h="18px" text="white"></i>
      <div inline="flex" justify="center" items="center" gap="2">
        <i i-carbon-warning text="orange" w="4" h="4"></i>
        <span text="sm">发生故障</span>
      </div>
    </el-popover>
  </div>
</template>

<script setup>
defineProps({
  value: [Boolean, Number, String],
  error: [Boolean, Number, String],
  showError: [Boolean]
});
</script>

<style lang="scss" scoped></style>
