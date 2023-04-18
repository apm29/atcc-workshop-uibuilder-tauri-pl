export function rawValueFormatter(v) {
  return v
}
export function currentValueFormatter(current) {
  current = parseFloat(current)
  if (current && current >= 0.6) {
    return current.toFixed(1)
  } else {
    return "0.0"
  }
}

export function minuteSecondFormatter(seconds) {
  return `${Math.floor(seconds / 60)}分${Math.floor(seconds % 60)}秒`
}

export function minuteSecondFormatter2(seconds) {
  if(seconds>=0){
    return `${Math.floor(seconds / 60)}:${("0"+Math.floor(seconds % 60)).slice(-2)}`
  } else {
    return `负数`
  }
}
