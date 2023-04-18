<template>
  <div inline="block">
    <el-button type="danger" @click="handleQuit()">退出</el-button>
    <el-dialog
      title="退出应用"
      :visible.sync="showEdit"
      width="40%"
      append-to-body
      :show-close="false"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
    >
      <el-form ref="form" label-width="80px">
        <el-form-item label="密码">
          <VirtualInput
            placeholder="输入密码"
            v-model="internalValue"
            type="password"
            keyboard-class="simple-keyboard"
          ></VirtualInput>
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
import { MessageBox } from 'element-ui';
import { useElectronAPI } from "~/composables"
import { DeveloperPass } from "~/configuration"
const internalValue = ref()
const showEdit = ref(false)
async function handleQuit(){
  showEdit.value = true;
}
const { quitApp } = useElectronAPI()
async function handleSave(){
  if(internalValue.value === DeveloperPass){
    quitApp()
  } else {
    MessageBox.alert("密码错误")
  }
}

</script>

<style lang="scss" scoped>

</style>
