// 获取assets静态资源
export const getAssetsFile = (url) => {
  return new URL(`/src/assets/images/${url}`, import.meta.url).href;
};
