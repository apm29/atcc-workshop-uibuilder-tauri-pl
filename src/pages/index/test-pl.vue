<template>
  <div
    p="x-4 y-6"
    :style="{
      width: elementWidth,
      height: elementHeight,
      margin: '0 auto',
    }"
    text="white"
    grid="~ cols-12"
    gap="3"
    class="test-page"
  >
    <el-tabs col="span-9" h="[calc(100vh-80px)]" flex="~ col">
      <el-tab-pane label="PLC1">
        <div grid="~ cols-2" gap="1">
          <template v-for="member of DictPLPlc.slice(0, 40)">
            <LabeledStatusDot
              v-if="member.type === 'BIT'"
              :value="PL_PLC_PAYLOAD[member.field]"
              :key="member.field"
            >
              {{ member.name }}
            </LabeledStatusDot>
            <NumberControl
              v-else
              :value="PL_PLC_PAYLOAD[member.field]?.toFixed(2)"
              :key="member.field"
              :label="member.name"
              :value-formatter="
                member.formatter === 'current' ? currentValueFormatter : rawValueFormatter
              "
            >
            </NumberControl>
          </template>

          <div col="span-2" flex="~" gap="3">
            <QuitButton></QuitButton>
            <DevButton></DevButton>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="PLC2">
        <div grid="~ cols-2" gap="1">
          <template v-for="member of DictPLPlc.slice(40)">
            <LabeledStatusDot
              v-if="member.type === 'BIT'"
              :value="PL_PLC_PAYLOAD[member.field]"
              :key="member.field"
            >
              {{ member.name }}
            </LabeledStatusDot>
            <NumberControl
              v-else
              :value="PL_PLC_PAYLOAD[member.field]?.toFixed(2)"
              :key="member.field"
              :label="member.name"
              :value-formatter="
                member.formatter === 'current' ? currentValueFormatter : rawValueFormatter
              "
            >
            </NumberControl>
          </template>

          <div col="span-2" flex="~" gap="3">
            <QuitButton></QuitButton>
            <DevButton></DevButton>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="485/A8">
        <div grid="~ cols-2" gap="1">
          <div flex="~" w="full" col="span-full" items="center" gap="4">
            <div class="h-1px flex-grow bg-white my-4"></div>
            A8
            <div class="h-1px flex-grow bg-white my-4"></div>
          </div>
          <template v-for="member of DictPLA8">
            <LabeledStatusDot
              v-if="member.type === 'BIT'"
              :value="PL_A8_PAYLOAD[member.field]?.toFixed(2)"
              :key="member.field"
            >
              {{ member.name }}
            </LabeledStatusDot>
            <NumberControl
              v-else
              :value="PL_A8_PAYLOAD[member.field]?.toFixed(2)"
              :key="member.field"
              :label="member.name"
              :value-formatter="
                member.formatter === 'current' ? currentValueFormatter : rawValueFormatter
              "
            >
            </NumberControl>
          </template>
          <div flex="~" w="full" col="span-full" items="center" gap="4">
            <div class="h-1px flex-grow bg-white my-4"></div>
            485
            <div class="h-1px flex-grow bg-white my-4"></div>
          </div>
          <template v-for="member of DictPL485Dev">
            <LabeledStatusDot
              v-if="member.type === 'BIT'"
              :value="member.field.split('.').reduce((v,i)=>{
                return v?.[i]
              },PL_485_PAYLOAD)"
              :key="member.field"
            >
              {{ member.name }}
            </LabeledStatusDot>
            <NumberControl
              v-else
              :value="member.field.split('.').reduce((v,i)=>{
                return v?.[i]
              },PL_485_PAYLOAD)?.toFixed(2)"
              :key="member.field"
              :label="member.name"
              :editable="member.permission === 'R/D'"
              :value-formatter="
                member.formatter === 'current' ? currentValueFormatter : rawValueFormatter
              "
              @save="handle485Set(member.cmd, $event)"
            >
            </NumberControl>
          </template>
        </div>
      </el-tab-pane>
    </el-tabs>
    <el-tabs col="span-3" h="[calc(100vh-80px)]">
      <el-tab-pane label="PLC">
        <pre v-html="MESSAGE_PL_PLC" />
      </el-tab-pane>
      <el-tab-pane label="485">
        <pre v-html="MESSAGE_PL_485" />
      </el-tab-pane>
      <el-tab-pane label="A8">
        <pre v-html="MESSAGE_PL_A8" />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import LabeledStatusDot from "~/components/display/LabeledStatusDot.vue";
import LabeledNumber from "~/components/display/LabeledNumber.vue";
import { useUiBuilder } from "~/composables/uibuilder";
import { useDefaultPageSize } from "~/composables/size/page";
import NumberControl from "~/components/form/NumberControl.vue";
import { Notification } from "element-ui";
import QuitButton from "~/components/feat/QuitButton.vue";
import DevButton from "~/components/feat/DevButton.vue";
import { DictPL485Dev, DictPLPlc, DictPLA8 } from "~/configuration/devices";
import { useDeviceStateStore } from "~/store/device-state";
import { rawValueFormatter, currentValueFormatter } from "~/helpers/value-formatter";

const { send } = useUiBuilder();

const { elementHeight, elementWidth } = useDefaultPageSize();
const deivceStateStore = useDeviceStateStore();

const {
  PL_PLC_PAYLOAD,
  PL_485_PAYLOAD,
  PL_A8_PAYLOAD,

  MESSAGE_PL_PLC,
  MESSAGE_PL_485,
  MESSAGE_PL_A8,
} = toRefs(deivceStateStore);

function handle485Set(cmd, value) {
  if (value > 50) {
    return Notification.error(`频率设定最大值为50`);
  }
  console.log(cmd, value);
  Notification.info(`正在设置${cmd},新数值为${value}`);
  send({
    topic: "PL1_485_DEV",
    cmd: cmd,
    payload: parseFloat(value),
  });
}
</script>
<style lang="scss">
.test-page {
  .el-tabs__content {
    height: calc(100% - 40px);
    @apply flex-grow overflow-auto scrollbar scrollbar-rounded scrollbar-thumb-color-sky-300/30 scrollbar-track-color-transparent;
  }
  .el-tabs__item {
    @apply text-white/50;
  }
  .el-tabs__item.is-active {
    @apply text-blue-500;
  }
  .el-tabs__nav-wrap::after {
    @apply bg-white/50;
  }
}
</style>
