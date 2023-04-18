import dayjs from "dayjs"
import "dayjs/locale/zh-cn"
import duration from "dayjs/plugin/duration"
export function install() {
  dayjs.locale("zh-cn")
  dayjs.extend(duration)
}
