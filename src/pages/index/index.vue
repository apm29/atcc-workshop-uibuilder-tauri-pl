<template>
  <div>

  </div>
</template>

<script setup>
import { MainMenu } from "~/configuration"
const router = useRouter()
router.replace(MainMenu?.[0]?.to??"/")
</script>

<style lang="scss" scoped>

</style>
