<template>
  <div
    min-w="20"
    font="bold"
    rounded="full"
    h="5.5"
    text="center 1rem"
    select="none"
    overflow="hidden"
    cursor="pointer"
    bg="light-50"
    flex="inline"
    items="center"
    @click="handleSwitch()"
    border="~ gray-400"
    @mousedown="$emit('mousedown', internalValue)"
    @mouseup="$emit('mouseup', internalValue)"
    whitespace="nowrap"
  >
    <div
      w="50%"
      :text="!internalValue ? 'white' : 'gray-400'"
      :bg="!internalValue ? 'gray-500' : 'white'"
      :shadow="!internalValue ? 'none' : 'inner dark-500'"
      font="bold"
      transition="color duration-300 ease"
      p="l-2.25"
    >
      <span v-if="!loading || internalValue">{{ inactiveLabel }}</span>
      <span v-else>
        <i inline="block" i-mdi-loading animate="~ spin" h="4" m="t-1.5"></i>
      </span>
    </div>
    <div
      w="50%"
      font="bold"
      :text="internalValue ? 'white' : 'gray-400'"
      :bg="internalValue ? 'blue-500' : 'white'"
      :shadow="internalValue ? 'none' : 'inner dark-500'"
      transition="color duration-300 ease"
      p="r-2.25"
    >
      <span v-if="!loading || !internalValue">{{ activeLabel }}</span>
      <span v-else>
        <i inline="block" i-mdi-loading animate="~ spin" h="4" m="t-1.5"></i>
      </span>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  value: [Boolean, Number, String],
  disabled: [Boolean],
  activeLabel: {
    type:String,
    default:"开"
  },
  inactiveLabel:  {
    type:String,
    default:"关"
  },
  timeout:{
    type:Number,
    default:4000
  }
});

const internalValue = ref(props.value);
const loading = ref(false);
const loadingTimer = ref();
watch(
  () => props.value,
  (v) => {
    loading.value = false;
    internalValue.value = v;
    clearTimeout(loadingTimer.value)
  }
);
const emits = defineEmits(["input"]);

function handleSwitch() {
  if(props.disabled || loading.value){
    return
  }
  loading.value = true;
  const oldValue = internalValue.value;
  internalValue.value = !internalValue.value;
  emits("input", internalValue.value);
  //2000ms后设置失败
  loadingTimer.value = setTimeout(()=>{
    loading.value = false;
    internalValue.value = oldValue;
    emits("input", internalValue.value);
  },props.timeout)
}
</script>
