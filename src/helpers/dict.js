//0 表示双轴搅拌变频
export const list = [
  [{ prop: "HLSLX_Motor", label: "混料双螺旋变频", topic: "ZQ_485_DEV", type: "混料双螺旋频率设置" }],
]

export const hex2int = function(hex) {
  var len = hex.length, a = new Array(len), code;
  for (var i = 0; i < len; i++) {
      code = hex.charCodeAt(i);
      if (48<=code && code < 58) {
          code -= 48;
      } else {
          code = (code & 0xdf) - 65 + 10;
      }
      a[i] = code;
  }
  
  return a.reduce(function(acc, c) {
      acc = 16 * acc + c;
      return acc;
  }, 0);
}
//modbusAddr和regAddr字典
export const addressArray = {
  "混料双螺旋频率": { modbus_addr: hex2int("02"), reg_addr: hex2int("0007"), exeOrder: 2, },
  "混料双螺旋电流": { modbus_addr: hex2int("02"), reg_addr: hex2int("7224"), exeOrder: 1, }
}