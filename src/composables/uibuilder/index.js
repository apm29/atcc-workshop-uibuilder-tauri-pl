
const connected = ref(false)

export function useUiBuilder() {
  const uibuilder = window.uibuilder;
  function onMessageReceive(fn) {
    uibuilder?.onChange("msg", fn)
  }
  function onMessageSent(fn) {
    uibuilder?.onChange("msgsSent", fn)
  }  
  function onCtrlMessage(fn) {
    uibuilder?.onChange("ctrlMsg", fn)
  }  
  function onCtrlMessageSent(fn) {
    uibuilder?.onChange("msgsSentCtrl", fn)
  }

  function start(){
    //debug日志开关
    uibuilder?.debug(false);
    //开启连接
    uibuilder?.start(window.NODERED_UIBUILDER_NAMESPACE, "/uibuilder/vendor/socket.io")
    
    console.log("UIBUILDER START >>>>>>");
  }

  

  return {
    send: uibuilder?.send ?? function () { console.error("uibuilder未接入") },
    connected,
    onMessageReceive,
    onMessageSent,
    onCtrlMessage,
    onCtrlMessageSent,
    uibuilder,
    start
  }
}
