import { useUiBuilder } from "~/composables/uibuilder";
import { Notification } from "element-ui"

export function install({ app }) {
  //连接状态
  const {  start, connected,uibuilder } = useUiBuilder()

  uibuilder?.onChange("ioConnected", function (ioConnected) {
    console.log(`NodeRed连接:${ioConnected?'已连接':'已断开'}`);
    connected.value = ioConnected;
    if (ioConnected && uibuilder.get("disconnected_once")) {
      Notification({
        type: "success",
        message: "已连接"
      });
      uibuilder.set("disconnected_once", false)
    } else if (!ioConnected) {
      Notification({
        type: "error",
        message: "连接断开!"
      });
      uibuilder.set("disconnected_once", true)
    }
  });

  start()
  
}
