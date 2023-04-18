<template>
  <div
    z="10"
    justify="center"
    items="center"
    fixed="~"
    top="0"
    left="0"
    h="screen"
    w="screen"
    text="white 2xl center"
    pointer-events="none"
    :class="alert ? 'alert-frame' : ''"
  >
    <div class="impact-wrapper">
      <ImpactAlertItem
        class="impact"
        v-for="error of plPlcErrors"
        :title="error.name"
        :value="error.value"
        :key="error.field"
      >
      </ImpactAlertItem>
      <ImpactAlertItem
        class="impact"
        v-for="error of pl485Errors"
        :title="error.name"
        :value="error.value"
        :key="error.field"
      >
      </ImpactAlertItem>
    </div>
  </div>
</template>

<script setup>
import { DictPL485Dev, DictPLPlc } from "~/configuration";
import ImpactAlertItem from "./ImpactAlertItem.vue";

const deviceStateStore = useDeviceStateStore();
const { PL_PLC_PAYLOAD, PL_485_PAYLOAD } = toRefs(deviceStateStore);

const plPlcErrors = computed(() => {
  return Object.keys(PL_PLC_PAYLOAD.value)
    .filter((key) => key.endsWith("_Err"))
    .map((key) => {
      return {
        ...DictPLPlc.find((it) => it.field === key),
        value: PL_PLC_PAYLOAD.value[key],
      };
    });
});

const pl485Errors = computed(() => {
  //SB规则
  // 485payload.hf1.err && 485payload.hf1.r1 === 7 时才报警

  return Object.keys(PL_485_PAYLOAD.value)
    .flatMap((key) => {
      const value = PL_485_PAYLOAD.value[key];
      if (typeof value === "object") {
        return Object.keys(value).map((it) => [key, it]);
      } else {
        return [[key]];
      }
    })
    .filter((keys) => keys[keys.length - 1].endsWith("err"))
    .map((keys) => {
      const errValue = keys.reduce((v, i) => {
        return v?.[i];
      }, PL_485_PAYLOAD.value);
      const r1Keys = [keys[0], "r1"];
      const r1Value = r1Keys.reduce((v, i) => {
        return v?.[i];
      }, PL_485_PAYLOAD.value);
      return {
        ...DictPL485Dev.find((it) => it.field === keys.join(".")),
        value: Boolean(errValue && r1Value === 7),
      };
    });
});

const alert = computed(() => {
  return (
    plPlcErrors.value.some((it) => it.value) || pl485Errors.value.some((it) => it.value)
  );
});
</script>

<style lang="scss" scoped>
.impact-wrapper {
  position: absolute;
  left: 35%;
  top: 52%;
}
.impact {
  background:  rgba(207, 100, 24, 1);
  width: 340px !important;
  height: 75px;
  margin-bottom: 12px;
  // transform: translateX(-50vw);
  @apply bg-dark-500;
  
}

@keyframes progressMove {
  0% {
    background-position: 0;
  }
  100% {
    background-position: 1024px;
  }
}
.alert-frame {
  box-shadow: inset 0 0 140px rgba(249, 115, 22, 0.8);
}
</style>
