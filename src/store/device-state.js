import { defineStore } from 'pinia'
import { useUiBuilder } from "~/composables/uibuilder";

export const useDeviceStateStore = defineStore("device-state", () => {


  const { send, onMessageReceive, onCtrlMessage, start, connected } = useUiBuilder();

  onCtrlMessage((ctrlMsg) => {
    console.log("uibuilderCtrl:", ctrlMsg);
  })


  watch(connected, (connected) => {
    if (connected) {
      send({
        topic: "PL1_485_DEV",
        cmd: "qstart",
        payload: {
          data: {},
        },
      });
      // send({
      //   topic: "HM1_485_DEV",
      //   cmd: "qstart",
      //   payload: {
      //     data: {},
      //   },
      // });
      // send({
      //   topic: "ZQ1_485_DEV",
      //   cmd: "qstart",
      //   payload: {
      //     data: {},
      //   },
      // });
    }
  });

  const PL_A8_PAYLOAD = ref({})

  const PL_PLC_PAYLOAD = ref({})
  const PL_485_PAYLOAD = ref({})

  const MESSAGE_PL_A8 = ref()

  const MESSAGE_PL_PLC = ref()
  const MESSAGE_PL_485 = ref()

  //报警
  const A8_ERROR_OCCURED = ref(false)

  onMessageReceive((msg) => {
    const { topic, payload } = msg;

    if (payload?.Error) {
      console.log(msg);
      return Notification.error(`${payload.Desc} 错误代码:${payload.Error}`);
    }
    //设置提示
    if (["PL_485_SET"].includes(topic)) {
      return Notification.success(`设置成功${Object.keys(payload ?? {})}`);
    }
    if (topic === "PL1_A8") {
      PL_A8_PAYLOAD.value = payload;
      MESSAGE_PL_A8.value = JSON.stringify(msg, null, 2)
    } else if (topic === "PL1_485_DEV") {
      PL_485_PAYLOAD.value = payload;
      MESSAGE_PL_485.value = JSON.stringify(msg, null, 2)
    } else if (topic === "PL1_PLC") {
      PL_PLC_PAYLOAD.value = payload;
      MESSAGE_PL_PLC.value = JSON.stringify(msg, null, 2)
    } 

    //重要报警
    //A8
    A8_ERROR_OCCURED.value = PL_PLC_PAYLOAD.value?.A8_Err ?? false;
  })

  return {
    //payload object
    PL_A8_PAYLOAD,
    PL_PLC_PAYLOAD,
    PL_485_PAYLOAD,
    //message json
    MESSAGE_PL_A8,
    MESSAGE_PL_PLC,
    MESSAGE_PL_485,
    //alert
    A8_ERROR_OCCURED
  }
})
