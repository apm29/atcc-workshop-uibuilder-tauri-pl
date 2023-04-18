<template>
  <div :flex="flex[labelPlacement]" gap="x-4 y-2" items="center">
    <div text="center light-50 lg" whitespace="nowrap" font="bold">
      {{ label }}
    </div>
    <div
      border="1 light-50"
      text="blue-200"
      min-w="24"
      whitespace="nowrap"
      p="x-3"
      font="bold"
      flex="~"
      items="center"
      justify="between"
      bg="dark-900"
      @click="handleEdit()"
    >
      <span>
        <span v-if="prefix" text="light-50 1rem">{{ prefix }} : </span>
        <span
          class="font-seven"
          v-if="value || value == 0 || value === false || value === true || value === NaN"
        >
          {{ valueFormatter(value) }}
        </span>
        <span v-else class="font-seven" line="through"> 0000 </span>
        <span text="sm" v-if="suffix">{{ suffix }}</span>
      </span>
      <i v-show="editable" class="el-icon-edit" cursor="pointer" text="lg"></i>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="showEdit"
      width="40%"
      append-to-body
      :show-close="false"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-form ref="form" label-width="180px">
        <el-form-item label="分钟">
          <el-input-number
            placeholder="分钟"
            v-model="minutes"
            keyboard-class="simple-keyboard"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="秒">
          <el-input-number
            placeholder="秒"
            v-model="seconds"
            keyboard-class="simple-keyboard"
          ></el-input-number>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showEdit = false">取 消</el-button>
        <el-button type="primary" @click="handleSave()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup>
import VirtualInput from "~/components/keyboard/VirtualInput.vue";
import VirtualNumber from "../keyboard/VirtualNumber.vue";
import dayjs from "dayjs";
const props = defineProps({
  value: {
    type: [Boolean, Number, String],
    default: () => null,
  },
  label: [String],
  placeholder: [String],
  title: [String],
  prefix: [String],
  suffix: [String],
  editable: [Boolean],
  //标签相对数字的位置
  labelPlacement: {
    type: String,
    default: () => "left",
    validator: (v) => ["left", "bottom", "top"].includes(v),
  },
  valueFormatter: {
    type: Function,
    default: (value) => {
      return value;
    },
  },
});

const emit = defineEmits(["edit", "save"]);
const flex = {
  left: "~ row",
  bottom: "~ col-reverse",
  top: "~ col",
};

const showEdit = ref(false);
function handleEdit() {
  if (props.editable) {
    showEdit.value = true;
    emit("edit");
  }
}
function handleSave() {
  showEdit.value = false;
  emit("save", internalValue.value);
}
const internalValue = computed(()=>{
  return minutes.value * 60 + seconds.value;
});
const minutes = ref(0);
const seconds = ref(0);
watch(
  () => props.value,
  (v) => {
    if (!showEdit.value) {
      minutes.value = Math.floor(v/60);
      seconds.value = Math.floor(v%60);
    }
  }
);
watch(showEdit, (v) => {
});
</script>

<style lang="scss" scoped>
.font-seven {
  font-family: "seven-segment";
}
</style>
