import { Notification } from "element-ui";

export function assertInRange(min, max, value) {
  value = parseFloat(value)
  if (assertIsNumber(value)) {
    if (min <= value && max >= value) {
      return true
    } else {
      Notification.error(`请输入${min}~${max}的数字`);
      return false;
    }
  }
}


export function assertIsNumber(value) {
  value = parseFloat(value)
  if (typeof value !== 'number' || value === NaN) {
    Notification.error("请输入数字");
    return false
  } else {
    return true
  }
}

