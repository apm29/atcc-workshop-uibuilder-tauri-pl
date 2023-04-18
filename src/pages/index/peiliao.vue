<template>
  <div
    :style="{
      width: elementWidth,
      height: elementHeight,
      margin: '0 auto',
    }"
    relative="~"
    class="page-peiliao"
  >
    <div
      absolute="~"
      left="50%"
      top="2%"
      transform="~"
      translate="x--1/2"
      font="bold"
      text="center xl light-50"
      tracking="0.5em"
    >
      竹蜻蜓配料系统
    </div>
    <Timer absolute="~" left="2%" top="0.5%"></Timer>

    <!-- 进料百分比 -->
    <div
      absolute="~"
      top="15%"
      left="3%"
      border="~ gray-100"
      text="lg white"
      bg="dark-900"
      font="bold xs"
      p="x-4 y-1"
      rounded="lg"
      z="1"
    >
      进料信息
    </div>
    <div
      absolute="~"
      top="17.5%"
      left="3%"
      border="~ gray-100/70"
      rounded="lg"
      p="x-16px t-25px b-16px"
      text="white center"
      w="44%"
    >
      <table w="full" class="info-table">
        <thead>
          <tr>
            <th>配料设备</th>
            <th w="50%">进料百分比</th>
            <th text="center">实时重量</th>
            <th>配方</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <StatusDot :value="PL_A8_PAYLOAD.N_CUR_P == 1" m="r-3"></StatusDot>P1
            </td>
            <td>
              <HorizontalProgress :value="PL_A8_PAYLOAD.P1 ?? 0"></HorizontalProgress>
            </td>
            <td>{{ PL_A8_PAYLOAD.N_P1_RT_WGT_ADD ?? "- - - -" }} kg</td>
            <td>{{ PL_A8_PAYLOAD.N_P1 ?? "- - - -" }} kg</td>
          </tr>
          <tr>
            <td>
              <StatusDot :value="PL_A8_PAYLOAD.N_CUR_P == 2" m="r-3"></StatusDot>P2
            </td>
            <td>
              <HorizontalProgress :value="PL_A8_PAYLOAD.P2 ?? 0"></HorizontalProgress>
            </td>
            <td>{{ PL_A8_PAYLOAD.N_P2_RT_WGT_ADD ?? "- - - -" }} kg</td>
            <td>{{ PL_A8_PAYLOAD.N_P2 ?? "- - - -" }} kg</td>
          </tr>
          <tr>
            <td>
              <StatusDot :value="PL_A8_PAYLOAD.N_CUR_P == 3" m="r-3"></StatusDot>P3
            </td>
            <td>
              <HorizontalProgress :value="PL_A8_PAYLOAD.P3 ?? 0"></HorizontalProgress>
            </td>
            <td>{{ PL_A8_PAYLOAD.N_P3_RT_WGT_ADD ?? "- - - -" }} kg</td>
            <td>{{ PL_A8_PAYLOAD.N_P3 ?? "- - - -" }} kg</td>
          </tr>
          <tr>
            <td>
              <StatusDot :value="PL_A8_PAYLOAD.N_CUR_P == 4" m="r-3"></StatusDot>P4
            </td>
            <td>
              <HorizontalProgress :value="PL_A8_PAYLOAD.P4 ?? 0"></HorizontalProgress>
            </td>
            <td>{{ PL_A8_PAYLOAD.N_P4_RT_WGT_ADD ?? "- - - -" }} kg</td>
            <td>{{ PL_A8_PAYLOAD.N_P4 ?? "- - - -" }} kg</td>
          </tr>
          <tr>
            <td>P5</td>
            <td>
              <!-- <HorizontalProgress :value="PL_A8_PAYLOAD.P5 ?? 0"></HorizontalProgress> -->
            </td>
            <td>
              {{
                (PL_A8_PAYLOAD.N_XJLD_RT_WGT && (PL_A8_PAYLOAD.N_XJLD_RT_WGT ).toFixed(0)) ?? "- - - -"
              }}
              g
            </td>
            <td>
              {{
                (PL_A8_PAYLOAD.N_P5 && (PL_A8_PAYLOAD.N_P5 * 100).toFixed(0)) ?? "- - - -"
              }}
              g
            </td>
          </tr>
          <tr>
            <td>卸料百分比</td>
            <td>
              <HorizontalProgress :value="PL_A8_PAYLOAD.UNLOAD ?? 0"></HorizontalProgress>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>配料桶数</td>
            <td></td>
            <td>
              <!-- <NumberControl :value="PL_A8_PAYLOAD.N_PLTS" suffix="桶" /> -->
              <!-- {{PL_A8_PAYLOAD.N_PLTS ?? '----'}} 桶 -->
            </td>
            <td>
              <!-- <NumberControl :value="PL_A8_PAYLOAD.N_PLTS" suffix="桶" /> -->
              {{ PL_A8_PAYLOAD.N_PLTS ?? "----" }} 桶
            </td>
          </tr>
          <tr>
            <td colspan="2"  text="1rem!">小计量斗实时总重量</td>
            <td />

            <td colspan="1" text="1rem! left!">
              <!-- <NumberControl ext="lg" :value="PL_A8_PAYLOAD.N_XJLD_RT_WGT" suffix="g" /> -->
              {{ PL_A8_PAYLOAD.N_XJLD_RT_WGT ?? "----" }} g
            </td>
          </tr>
          <tr>
            <td colspan="2"  text="1rem!">大计量斗实时总重量</td>
            <td />

            <td colspan="1" text="1rem! left!">
              <!-- <NumberControl text="lg" :value="PL_A8_PAYLOAD.N_DJLD_RT_WGT" suffix="kg" /> -->
              {{ PL_A8_PAYLOAD.N_DJLD_RT_WGT ?? "----" }} kg
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div
      absolute="~"
      top="71.5%"
      left="2%"
      border="~ gray-100/70"
      rounded="lg"
      p="x-16px t-15px b-16px"
      text="white center"
      w="56%"
    >
      <div w="full" text="sm start" grid="~ cols-4" gap="1">
        <div text="">红粉1</div>
        <div text="">红粉2</div>
        <div text="">红粉3</div>
        <div text="">红粉4</div>
        <!-- <div>
          <StatusDot
            :value="PL_PLC_PAYLOAD.HF1_PLLX_Sta"
          ></StatusDot>
          <span m="r-3">配料螺旋</span>
        </div>
        <div>
          <StatusDot
            :value="PL_PLC_PAYLOAD.HF2_PLLX_Sta"
          ></StatusDot>
          <span m="r-3">配料螺旋</span>
        </div>
        <div>
          <StatusDot
            :value="PL_PLC_PAYLOAD.HF3_PLLX_Sta"
          ></StatusDot>
          <span m="r-3">配料螺旋</span>
        </div>
        <div>
          <StatusDot
            :value="PL_PLC_PAYLOAD.HF4_PLLX_Sta"
          ></StatusDot>
          <span m="r-3">配料螺旋</span>
        </div> -->
        <div>
          <StatusDot :value="PL_PLC_PAYLOAD.HF1_SLTS_Sta"></StatusDot>
          <span m="r-3">上料提升</span>
        </div>
        <div>
          <StatusDot :value="PL_PLC_PAYLOAD.HF2_SLTS_Sta"></StatusDot>
          <span m="r-3">上料提升</span>
        </div>
        <div>
          <StatusDot :value="PL_PLC_PAYLOAD.HF3_SLTS_Sta"></StatusDot>
          <span m="r-3">上料提升</span>
        </div>
        <div>
          <StatusDot :value="PL_PLC_PAYLOAD.HF4_SLTS_Sta"></StatusDot>
          <span m="r-3">上料提升</span>
        </div>
        <div>
          <StatusDot :value="PL_PLC_PAYLOAD.HF1_CSLX_Sta"></StatusDot>
          <span m="r-3">传输螺旋</span>
        </div>
        <div>
          <StatusDot :value="PL_PLC_PAYLOAD.HF2_CSLX_Sta"></StatusDot>
          <span m="r-3">传输螺旋</span>
        </div>
        <div>
          <StatusDot :value="PL_PLC_PAYLOAD.HF3_CSLX_Sta"></StatusDot>
          <span m="r-3">传输螺旋</span>
        </div>
        <div>
          <StatusDot :value="PL_PLC_PAYLOAD.HF4_CSLX_Sta"></StatusDot>
          <span m="r-3">传输螺旋</span>
        </div>
        <div>
          <StatusDot :value="PL_PLC_PAYLOAD.HF1_DZJ_Output"></StatusDot>
          <span m="r-3">电震机</span>
        </div>
        <div>
          <StatusDot :value="PL_PLC_PAYLOAD.HF2_DZJ_Output"></StatusDot>
          <span m="r-3">电震机</span>
        </div>
        <div>
          <StatusDot :value="PL_PLC_PAYLOAD.HF3_DZJ_Output"></StatusDot>
          <span m="r-3">电震机</span>
        </div>
        <div>
          <StatusDot :value="PL_PLC_PAYLOAD.HF4_DZJ_Output"></StatusDot>
          <span m="r-3">电震机</span>
        </div>
        <NumberControl
          prefix="最大定时"
          :value="PL_PLC_PAYLOAD.HF1_DZJ_TIM_MAX_Set"
          editable
          suffix="秒"
          @save="handlePLCSet('HF1_DZJ_TIM_MAX_Set', $event)"
          number
          title="红粉1电震机最大定时"
        >
        </NumberControl>
        <NumberControl
          prefix="最大定时"
          :value="PL_PLC_PAYLOAD.HF2_DZJ_TIM_MAX_Set"
          @save="handlePLCSet('HF2_DZJ_TIM_MAX_Set', $event)"
          editable
          suffix="秒"
          number
          title="红粉2电震机最大定时"
        >
        </NumberControl>
        <NumberControl
          prefix="最大定时"
          :value="PL_PLC_PAYLOAD.HF3_DZJ_TIM_MAX_Set"
          @save="handlePLCSet('HF3_DZJ_TIM_MAX_Set', $event)"
          editable
          suffix="秒"
          number
          title="红粉3电震机最大定时"
        >
        </NumberControl>
        <NumberControl
          prefix="最大定时"
          :value="PL_PLC_PAYLOAD.HF4_DZJ_TIM_MAX_Set"
          @save="handlePLCSet('HF4_DZJ_TIM_MAX_Set', $event)"
          editable
          suffix="秒"
          number
          title="红粉4电震机最大定时"
        >
        </NumberControl>
        <NumberControl
          prefix="震动时间"
          :value="PL_PLC_PAYLOAD.HF1_DZJ_TIM_Set"
          editable
          suffix="秒"
          number
          @save="handlePLCSet('HF1_DZJ_TIM_Set', $event)"
          title="红粉1电震机震动时间"
        >
        </NumberControl>

        <NumberControl
          prefix="震动时间"
          :value="PL_PLC_PAYLOAD.HF2_DZJ_TIM_Set"
          @save="handlePLCSet('HF2_DZJ_TIM_Set', $event)"
          editable
          suffix="秒"
          number
          title="红粉2电震机震动时间"
        >
        </NumberControl>

        <NumberControl
          prefix="震动时间"
          :value="PL_PLC_PAYLOAD.HF3_DZJ_TIM_Set"
          @save="handlePLCSet('HF3_DZJ_TIM_Set', $event)"
          editable
          suffix="秒"
          number
          title="红粉3电震机震动时间"
        >
        </NumberControl>

        <NumberControl
          prefix="震动时间"
          :value="PL_PLC_PAYLOAD.HF4_DZJ_TIM_Set"
          @save="handlePLCSet('HF4_DZJ_TIM_Set', $event)"
          editable
          suffix="秒"
          number
          title="红粉4电震机震动时间"
        >
        </NumberControl>
      </div>
    </div>

    <!-- 配料料仓 -->
    <!-- <img
      absolute="~"
      h="9%"
      top="56%"
      left="28.5%"
      :src="getAssetsFile('svg/料仓.svg')"
    />
    <div absolute="~" top="58.5%" left="24.5%" text="white" font="bold">料仓</div> -->

    <!-- 配料螺旋 -->
    <img
      absolute="~"
      h="2.5%"
      top="65.5%"
      left="23.5%"
      :src="getAssetsFile('配料螺旋.png')"
    />
    <div absolute="~" top="65%" left="15.5%" text="white" font="bold">配料螺旋</div>

    <!-- 配料提升机 -->
    <img
      absolute="~"
      w="6.55%"
      top="34%"
      left="46.5%"
      :src="getAssetsFile('svg/提升机.svg')"
    />
    <div
      absolute="~"
      top="28.05%"
      left="48%"
      label="提升机"
      text="center light-50 lg"
      whitespace="nowrap"
      font="bold"
      label-placement="top"
    >
      提升机
    </div>
    <!-- <StatusDot absolute="~" top="27.5%" left="47.15%"></StatusDot> -->

    <!-- 配料传输螺旋1 -->
    <img
      absolute="~"
      w="2%"
      top="44%"
      left="53.5%"
      :src="getAssetsFile('配料传输螺旋1.png')"
    />
    <div
      absolute="~"
      top="40.25%"
      left="52.5%"
      text="center light-50 lg"
      whitespace="nowrap"
      font="bold"
    >
      传输螺旋
    </div>
    <!-- <StatusDot absolute="~" top="27.5%" left="61.25%"></StatusDot> -->

    <!-- 配料传输螺旋2 -->
    <img
      absolute="~"
      h="3%"
      top="63%"
      left="55%"
      :src="getAssetsFile('配料传输螺旋2.png')"
    />
    <div
      absolute="~"
      top="66.55%"
      left="60%"
      text="center light-50 lg"
      whitespace="nowrap"
      font="bold"
    >
      上料螺旋
    </div>
    <!-- <StatusDot absolute="~" top="53.75%" left="56.75%"></StatusDot> -->

    <!-- 配料料桶 -->
    <StatedImage
      h="14.5%"
      absolute="~"
      top="58%"
      left="76%"
      :value="PL_PLC_PAYLOAD.DJLDDCF_Sta"
      running-path="svg/卸料斗.svg"
      error-path="svg/卸料斗.svg"
      idle-path="svg/卸料斗.svg"
    />
    <div
      absolute="~"
      top="71.5%"
      left="73%"
      editable
      text="center light-50 lg"
      whitespace="nowrap"
      font="bold"
    >
      大计量斗卸料阀
    </div>
    <StatusSquare
      absolute="~"
      top="68.5%"
      left="78%"
      :value="PL_PLC_PAYLOAD.DJLDDCF_Sta"
    ></StatusSquare>
    <!-- <StatusDot
      :value="PL_PLC_PAYLOAD.DJLDDCF_Sta"
      absolute="~"
      top="66%"
      left="78.75%"
    ></StatusDot> -->

    <!-- 配料料桶 -->
    <StatedImage
      h="10.5%"
      absolute="~"
      top="58%"
      left="86%"
      :value="PL_PLC_PAYLOAD.XJLD_XLF_Output"
      running-path="svg/卸料斗.svg"
      error-path="svg/卸料斗.svg"
      idle-path="svg/卸料斗.svg"
    />
    <div
      absolute="~"
      top="68%"
      left="82%"
      text="center light-50 lg"
      whitespace="nowrap"
      font="bold"
    >
      小计量斗卸料阀
    </div>
    <StatusSquare
      absolute="~"
      top="65%"
      left="87%"
      :value="PL_PLC_PAYLOAD.XJLD_XLF_Output"
    ></StatusSquare>

    <!-- <StatusDot
      :value="PL_PLC_PAYLOAD.XJLD_XLF_Output"
      absolute="~"
      top="63.8%"
      left="87.75%"
    ></StatusDot> -->

    <!-- 配料犁刀机 -->
    <StatedImage
      w="28%"
      absolute="~"
      top="74.75%"
      left="66.55%"
      :value="PL_PLC_PAYLOAD.LDJ_Sta"
      running-path="svg/犁刀机_run.svg"
      error-path="svg/犁刀机_err.svg"
      idle-path="svg/犁刀机.svg"
    />
    <NumberControl
      absolute="~"
      top="86.5%"
      left="64%"
      label="犁刀机"
      label-placement="top"
      :value="PL_PLC_PAYLOAD.LDJ_Current?.toFixed(2)"
      :value-formatter="currentValueFormatter"
      suffix="A"
    ></NumberControl>
    <!-- <SmallSwitch
      absolute="~"
      top="82.5%"
      left="59.8%"
      label="犁刀机控制-输出"
      label-placement="top"
      :value="payload.LDJ_Output"
      editable
    ></SmallSwitch> -->
    <!-- <StatusDot
      :value="PL_PLC_PAYLOAD.LDJ_Sta"
      absolute="~"
      top="81.25%"
      left="69.25%"
    ></StatusDot> -->

    <div
      absolute="~"
      top="92.5%"
      left="77%"
      label="混料机卸料电磁阀"
      label-placement="top"
      text="center light-50 lg"
      whitespace="nowrap"
      font="bold"
    >
      混料机卸料电磁阀
    </div>
    <StatusSquare
      :value="PL_PLC_PAYLOAD.HLJXLDCF_Sta"
      absolute="~"
      top="89.25%"
      left="83.25%"
    ></StatusSquare>
    <div absolute="~" top="8.5%" left="6%" grid="~ cols-8" items="center" gap="2">
     <NumberControl text="normal" prefix="A相电压" :value="PL_485_PAYLOAD?.power?.ua" suffix="V"/>
     <NumberControl text="normal" prefix="B相电压" :value="PL_485_PAYLOAD?.power?.ub" suffix="V"/>
     <NumberControl text="normal" prefix="C相电压" :value="PL_485_PAYLOAD?.power?.uc" suffix="V"/>
     <NumberControl text="normal" prefix="A相电流" :value="PL_485_PAYLOAD?.power?.ia" suffix="A"/>
     <NumberControl text="normal" prefix="B相电流" :value="PL_485_PAYLOAD?.power?.ib" suffix="A"/>
     <NumberControl text="normal" prefix="C相电流" :value="PL_485_PAYLOAD?.power?.ic" suffix="A"/>
     <NumberControl text="2xl!" col="span-2" label="正向有功电能" :value="PL_485_PAYLOAD?.power?.epp" suffix="kWh"/>
    </div>
    <div absolute="~" top="24.5%" right="10%" flex="~" items="center" gap="4">
      <StatusDot :value="PL_PLC_PAYLOAD.HLJSQ_Sta"></StatusDot>
      <TimeControl
        :value="PL_PLC_PAYLOAD.HLJSQ_Work_Tim_Set?.toFixed(1)"
        placeholder="输入0-65535(分钟)"
        title="混料计时器-工作时长设置"
        editable
        label="混料计时器"
        label-placement="left"
        :value-formatter="minuteSecondFormatter"
        @save="handleTimeSet($event)"
      ></TimeControl>
    </div>
    <DigitalNumber
      absolute="~"
      top="30.5%"
      right="4.0%"
      :value="PL_PLC_PAYLOAD.HLJSQ_Work_Tim_Clock?.toFixed(1)"
    ></DigitalNumber>
  </div>
</template>

<script setup>
import StatusDot from "~/components/display/StatusDot.vue";
import StatusSquare from "~/components/display/StatusSquare.vue";
import StatedImage from "~/components/display/StatedImage.vue";
import Timer from "~/components/display/Timer.vue";
import DigitalNumber from "~/components/display/DigitalNumber.vue";
import HorizontalProgress from "~/components/display/HorizontalProgress.vue";
import NumberControl from "~/components/form/NumberControl.vue";
import { getAssetsFile } from "~/composables/picture/picture";
import { useUiBuilder } from "~/composables/uibuilder";
import { useDefaultPageSize } from "~/composables/size/page";
import DebugPayload from "~/components/display/DebugPayload.vue";
import LabeledNumber from "~/components/display/LabeledNumber.vue";
import { Notification } from "element-ui";
import { useDeviceStateStore } from "~/store/device-state";
import TimeControl from "~/components/form/TimeControl.vue";
import { minuteSecondFormatter, currentValueFormatter } from "~/helpers/value-formatter";
import { addOperationRecord } from "~/api/plcDict";

const { elementHeight, elementWidth } = useDefaultPageSize();

const { send } = useUiBuilder();

const deivceStateStore = useDeviceStateStore();

const { PL_PLC_PAYLOAD, PL_485_PAYLOAD, PL_A8_PAYLOAD } = toRefs(deivceStateStore);

const showRedPowderSettings = ref(false);

function handlePLCSet(cmd, value) {
  console.log(cmd, value);
  Notification.info(`正在设置${cmd},新数值为${value}`);
  send({
    topic: "PL1_PLC",
    cmd: cmd,
    payload: parseFloat(value),
  });
  addOperationRecord({
    type: "配料",
    operation: `[PL1_PLC] 设置:${cmd},值:${value}`,
  });
}

function handleTimeSet($event) {
  handlePLCSet("HLJSQ_Work_Tim_Set", $event);
  setTimeout(() => {
    handlePLCSet("HLJSQ_Clock_Reset", $event);
  }, 150);
}
</script>

<style lang="scss" scoped>
.page-peiliao {
  .bottom-table {
    td {
      @apply pb-2;
      .status-dot {
        @apply mr-1;
      }
    }
  }
  .info-table {
    td,
    th {
      @apply whitespace-nowrap text-sm text-left;
      &:nth-child(1) {
        @apply min-w-100px;
      }
      &:nth-child(4) {
        @apply min-w-100px text-left;
      }
      &:nth-child(3) {
        @apply text-center min-w-100px;
      }
    }
  }
}
</style>
