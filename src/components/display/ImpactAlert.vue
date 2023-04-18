<template>
  <div
    z="10"
    backdrop="~"
    :backdrop="clickable ? 'none' : 'blur-sm'"
    justify="center"
    items="center"
    fixed="~"
    top="0"
    left="0"
    h="screen"
    w="screen"
    :bg="level < 5 ? 'yellow-400' : 'red-600'"
    :z="level < 5 ? '500' : '1000'"
    :bg-opacity="clickable ? '20' : '30'"
    text="dark-600 2xl center"
    :pointer="clickable ? 'events-none' : 'events-auto'"
    
  >
    <div class="impact" p="y-1" flex="~ col" :bg="level < 5 ? 'yellow-400' : 'red-600'" shadow="lg">
      <div>{{ title }}</div>
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
defineProps({
  clickable: Boolean,
  title: String,
  level: {
    type: Number,
    default: 1,
  },
});
</script>

<style lang="scss" scoped>
.impact {
  background-image: repeating-linear-gradient(60deg,hsla(0,0%,100%,0.1),hsla(0,0%,100%,0.1) 15px,transparent 0,transparent 30px);
  animation: progressMove 4s linear infinite;
  transform: translateX(-50vw);
  width: 200vw;
}

@keyframes progressMove {
    0% {
        background-position: 0px;
    }
    100% {
        background-position: 100px;
    }
}
</style>
