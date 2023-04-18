<template>
  <div v-show="internalValue" flex="~ col" items="center" justify="center">
    <div class="impact"></div>
    <span
      justify="center"
      flex="inline"
      gap="4"
      rounded="lg"
      items="center"
      pointer-events="auto"
      text="orange-400"
      font="bold"
    >
      
      <span text="lg" font="mono" class="animated animate-pulse">{{ title }}</span>
      <slot></slot>
      <i class="el-icon-error" cursor="pointer" @click="handleClose()" text="lg"></i>
    </span>
    <div class="impact"></div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  value: Boolean,
});

const emit = defineEmits(["input"])
const internalValue = ref(props.value);
const isolate = ref(false);
function handleClose() {
  internalValue.value = false;
  emit("input",false)
  isolate.value = true;
  setTimeout(()=>{
    isolate.value = false;
    internalValue.value = props.value;
  },30000)
}
watch(
  () => props.value,
  (v) => {
    if(!isolate.value){
      internalValue.value = v;
    }
  }
);
</script>

<style lang="scss" scoped>
.impact {
  background-image: repeating-linear-gradient(59.5deg,rgba(249, 22, 22, 0.8),rgba(249, 22, 22, 0.8), 15px,transparent 0,transparent 30px);
  background-size: 320px 320px;
  animation: progressMove 15s linear infinite;
  width: 100% !important;
  height: 20px;
  // transform: translateX(-50vw);
}

@keyframes progressMove {
    0% {
        background-position: 0;
    }
    100% {
        background-position: 320px;
    }
}
</style>
