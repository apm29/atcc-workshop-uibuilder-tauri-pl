<template>
  <div>
    <el-button size="mini" v-bind="$attrs" @click="show = true">
      <i i-carbon-debug text="xl"></i>
    </el-button>
    <el-dialog :visible.sync="show" fullscreen>
      <pre v-html="html"/>
    </el-dialog>
  </div>
</template>

<script setup>
const props = defineProps({
  payload:Object
})
const html = computed(()=>{
  return JSON.stringify(props.payload,null,2)
})
const show = ref(false)
</script>

<style lang="scss" scoped>

</style>
