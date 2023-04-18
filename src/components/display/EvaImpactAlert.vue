<template>
  <div
    v-show="internalValue"
    z="10"
    backdrop="~ blur-sm"
    justify="center"
    items="center"
    fixed="~"
    flex="~"
    top="52%"
    left="8"
    h="10%"
    w="20%"
    bg="yellow-400"
    bg-opacity="20"
    text="dark-600 2xl center"
  >
    <div class="impact" justify="center"  flex="~ col" gap="4" bg="dark-500" shadow="lg">
      <div text="xl" font="mono">{{ title }}</div>
      <slot>
        <div text="sm gray-300" bg="orange-600" animate="~ pulse" p="y-2">
        发生A8报警,请立即处理 
        <!-- <i class="el-icon-warning" inline="block"></i> -->
        <i class="el-icon-error" cursor="pointer"  @click="handleClose()"></i>
      </div>
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  value: Boolean
});

const internalValue = ref(props.value)
function handleClose(){
  console.log("handle close");
  internalValue.value = false;
}
watch(()=>props.value,(v)=>{
  console.log(v);
  internalValue.value = v;
})
</script>

<style lang="scss" scoped>
.impact {
  background-image: repeating-linear-gradient(61.5deg,rgba(249, 115, 22,0.8),rgba(249, 115, 22,0.8), 15px,transparent 0,transparent 30px);
  animation: progressMove 15s linear infinite;
  width: 1024px !important;
  height: 100px;
  // transform: translateX(-50vw);
}

@keyframes progressMove {
    0% {
        background-position: 0;
    }
    100% {
        background-position: 1024px;
    }
}
</style>
