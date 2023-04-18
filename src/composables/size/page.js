const DesignWidth = 1024;
const DesignHeight = 768;
const DesignNavigationBarHeight = 64;
export function useDefaultPageSize() {
  const { width, height } = useWindowSize()
  //默认设计稿1024 * 768
  const elementWidth = ref(`${DesignWidth}px`)
  const elementHeight = ref(`${DesignHeight}px`)
  watch([width, height], ([w, h]) => {
    const defaultScale = DesignWidth / DesignHeight;
    const scale = w / h;
    if (defaultScale > scale) {
      //高度比设计大
      elementWidth.value = `${width.value}px`;
      elementHeight.value = `${w / defaultScale - DesignNavigationBarHeight}px`
    } else if (defaultScale < scale) {
      //宽度比设计大
      elementHeight.value = `${height.value - DesignNavigationBarHeight}px`
      elementWidth.value = `${h * defaultScale}px`;
    } else {
      elementWidth.value = `${DesignWidth}px`;
      elementHeight.value = `${DesignHeight - DesignNavigationBarHeight}px`
    }
  }, { immediate: true })
  return {
    elementHeight, elementWidth
  }
}
