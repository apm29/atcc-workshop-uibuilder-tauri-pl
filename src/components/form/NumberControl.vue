<template>
  <div :flex="flex[labelPlacement]" gap="x-4 y-2" items="center">
    <div v-if="label" text="center light-50 sm" whitespace="nowrap" font="">
      {{ label }}
    </div>
    <div
      border="1 light-50"
      text="blue-200"
      min-w="24"
      whitespace="nowrap"
      font="bold"
      p="x-1"
      flex="~"
      items="center"
      justify="between"
      bg="dark-900"
      @click="handleEdit()"
    >
      <span>
        <span v-if="prefix" text="light-50 xs">{{ prefix }} : </span>
        <span
          class="font-seven"
          v-if="value || value == 0 || value === false || value === true || value === NaN"
        >
          {{ valueFormatter(value) }}
        </span>
        <span v-else class="font-seven" line="through"> 0000 </span>
        <span text="xs" v-if="suffix">{{ suffix }}</span>
      </span>
      <i v-show="editable" class="el-icon-edit" cursor="pointer" text="xs"></i>
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
      <el-form ref="form" label-width="70px">
        <el-form-item :label="label" class="flex">
          {{ prefix }}
          <component
            :is="number?VirtualNumber:VirtualInput"
            :placeholder="placeholder"
            v-model="internalValue"
            keyboard-class="simple-keyboard"
          ></component>
          {{  suffix }}
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
  number:Boolean
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
const internalValue = ref(props.value);
watch(
  () => props.value,
  (v) => {
    if (!showEdit.value) {
      internalValue.value = v;
    }
  }
);
watch(showEdit, (v) => {
  if (!v) {
    internalValue.value = props.value;
  }
});
</script>

<style lang="scss" scoped>
.font-seven {
  font-family: "seven-segment";
}
</style>
