<template>
  <div flex="~ col" class="home" relative="~">
    <div class="main-wrapper" flex="grow">
      <KeepAlive>
        <router-view></router-view>
      </KeepAlive>
    </div>
    <div absolute="~" right="6" top="4" cursor="pointer" @click="checkHistory">
      <img :src="getAssetsFile('history.png')" style="height: 24px" />
    </div>
    <div
      class="bottom-navigation-bar"
      flex="~"
      justify="evenly"
      items="center"
      p="y-4 x-2"
      gap="2"
    >
      <button
        :disabled="$route.path === item.to"
        v-for="(item, index) in MainMenu"
        :key="index"
        class="button__style"
        :class="{ route__active: $route.path === item.to }"
        @click="$router.push(item.to)"
      >
        {{ item.name }}
      </button>
    </div>
    <ImpactAlert title="连接断开!" v-if="!connected" text="dark-600 2xl center">
      <div text="sm dark-100">
        正在重新连接 <i class="el-icon-loading" inline="block"></i>
      </div>
    </ImpactAlert>
    <EvaImpactAlert
      :value="A8_ERROR_OCCURRED"
      text="white 2xl center"
      title="A8报警!!!"
    >
    </EvaImpactAlert>
    <StackImpactAlert></StackImpactAlert>
    <HistoryDialog
      :show="showHistoryDialog"
      @close="showHistoryDialog = false"
    ></HistoryDialog>
  </div>
</template>

<script setup>
import HistoryDialog from "~/components/dialogs/HistoryDialog.vue"; //操作历史记录
import ImpactAlert from "~/components/display/ImpactAlert.vue";
import EvaImpactAlert from "~/components/display/EvaImpactAlert.vue";
import { getAssetsFile } from "~/composables/picture/picture";
import { useUiBuilder } from "~/composables/uibuilder";
import { MainMenu } from "~/configuration";
import StackImpactAlert from "~/components/display/StackImpactAlert.vue";

//点击查询操作记录
const showHistoryDialog = ref(false);
const checkHistory = function () {
  showHistoryDialog.value = true;
};
const { connected } = useUiBuilder();

const deviceStateStore = useDeviceStateStore();
const { A8_ERROR_OCCURRED } = toRefs(deviceStateStore);
</script>

<style lang="scss" scoped>
.home {
  background-image: url("~/assets/images/bg.svg");
  background-size: cover;
  background-repeat: no-repeat;
}
.button__style {
  @apply border-3 h-8 text-center text-lg rounded-lg cursor-pointer text-gray-50 flex-grow;
  flex-basis: 0;
}
.route__active {
  @apply text-dark-50 bg-pink-50;
}
</style>
