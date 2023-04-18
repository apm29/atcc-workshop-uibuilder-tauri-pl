<template>
  <div class="inline-block">
    <el-input-number
      ref="realInput"
      :value="value"
      @input="handleInput"
      autofocus
      v-bind="$attrs"
    ></el-input-number>
    <div class="fixed-keyboard">
      <div ref="virtualKeyboard" :class="keyboardClass"></div>
    </div>
  </div>
</template>

<script setup>
import Keyboard from "simple-keyboard";
import "simple-keyboard/build/css/index.css";
const props = defineProps({
  value: [Number, String],
  keyboardClass: {
    default: "simple-keyboard",
    type: String,
  },
  layout: {
    type: Object,
    default: function () {
      return {
        default: ["1 2 3", "4 5 6", "7 8 9", "0 . {bksp}"],
        theme: " hg-theme-default hg-layout-numeric numeric-theme",
      };
    },
  },
});
const emits = defineEmits(["input"]);
const keyboard = ref(null);
const realInput = ref();
const virtualKeyboard = ref();
onMounted(() => {
  keyboard.value = new Keyboard(virtualKeyboard.value, {
    onChange: handleInput,
  });
  keyboard.value.setOptions({
    layoutName: "default",
    layout: props.layout,
    preventMouseDownDefault: true,
    display: {
      "{bksp}": "删除",
    },
  });
  keyboard.value.setInput(props.value+'');
  realInput.value.focus();
});
watch(
  () => props.value,
  function (value) {
    keyboard.value.setInput(value+'');
    realInput.value.focus();
  }
);
function handleInput(value) {
  emits("input", value);
  realInput.value.focus();
}
</script>

<style lang="scss">
.fixed-keyboard {
  position: fixed;
  z-index: 1000;
  width: 500px;
  left: 50%;
  bottom: 30px;
  transform: translateX(-50%);

  .hg-button {
    max-width: none;
    flex-basis: 0px !important;
  }
}
</style>
